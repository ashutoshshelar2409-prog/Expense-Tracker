'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses as ExpensesTable } from '@/utils/schema';
import { eq, and, desc, getTableColumns, sql } from 'drizzle-orm';

/**
 * Helper to retrieve and verify the authenticated Clerk user's email.
 * Throws an explicit authentication error if user is unauthenticated.
 */
async function getAuthUserEmail() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated.");
  }
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error("Unauthorized: Authenticated user email not found.");
  }
  return email;
}

/**
 * Fetches all budgets for the authenticated user, including aggregated spend and item counts.
 */
export async function getUserBudgets() {
  const email = await getAuthUserEmail();

  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`COALESCE(sum(CAST(${ExpensesTable.amount} AS NUMERIC)), 0)`.mapWith(Number),
      totalItem: sql`count(${ExpensesTable.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(ExpensesTable, eq(Budgets.id, ExpensesTable.budgetId))
    .where(eq(Budgets.createdBy, email))
    .groupBy(Budgets.id, Budgets.name, Budgets.amount, Budgets.icon, Budgets.createdBy)
    .orderBy(desc(Budgets.id));

  return result || [];
}

/**
 * Checks if the authenticated user has any existing budgets.
 */
export async function checkUserHasBudgets() {
  const email = await getAuthUserEmail();

  const result = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(eq(Budgets.createdBy, email))
    .limit(1);

  return { hasBudgets: result.length > 0 };
}

/**
 * Creates a new budget for the authenticated user.
 */
export async function createBudget({ name, amount, icon }) {
  const email = await getAuthUserEmail();

  if (!name || !amount) {
    throw new Error("Budget name and amount are required.");
  }

  const result = await db
    .insert(Budgets)
    .values({
      name: String(name).trim(),
      amount: String(amount).trim(),
      icon: icon || '💰',
      createdBy: email,
    })
    .returning({ insertedId: Budgets.id });

  return { success: true, data: result };
}

/**
 * Fetches specific budget details for the authenticated user, enforcing ownership.
 */
export async function getBudgetInfo(budgetId) {
  const email = await getAuthUserEmail();
  const numericId = Number(budgetId);
  if (isNaN(numericId)) return null;

  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`COALESCE(sum(CAST(${ExpensesTable.amount} AS NUMERIC)), 0)`.mapWith(Number),
      totalItem: sql`count(${ExpensesTable.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(ExpensesTable, eq(Budgets.id, ExpensesTable.budgetId))
    .where(and(eq(Budgets.createdBy, email), eq(Budgets.id, numericId)))
    .groupBy(Budgets.id, Budgets.name, Budgets.amount, Budgets.icon, Budgets.createdBy);

  if (!result || result.length === 0) {
    return null;
  }
  return result[0];
}

/**
 * Updates an existing budget for the authenticated user, enforcing ownership.
 */
export async function updateBudget({ budgetId, name, amount, icon }) {
  const email = await getAuthUserEmail();
  const numericId = Number(budgetId);
  if (isNaN(numericId)) {
    throw new Error("Invalid budget ID.");
  }

  const result = await db
    .update(Budgets)
    .set({
      name: String(name).trim(),
      amount: String(amount).trim(),
      icon: icon || '💰',
    })
    .where(and(eq(Budgets.id, numericId), eq(Budgets.createdBy, email)))
    .returning();

  if (!result || result.length === 0) {
    throw new Error("Unauthorized: Budget not found or you do not own this budget.");
  }

  return { success: true, data: result };
}

/**
 * Deletes a budget and all associated expenses for the authenticated user, enforcing ownership.
 */
export async function deleteBudget(budgetId) {
  const email = await getAuthUserEmail();
  const numericId = Number(budgetId);
  if (isNaN(numericId)) {
    throw new Error("Invalid budget ID.");
  }

  // Enforce ownership check before deletion
  const existing = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, numericId), eq(Budgets.createdBy, email)));

  if (!existing || existing.length === 0) {
    throw new Error("Unauthorized: Budget not found or you do not own this budget.");
  }

  // Delete all expenses belonging to this budget
  await db.delete(ExpensesTable).where(eq(ExpensesTable.budgetId, numericId));

  // Delete the budget itself
  const result = await db
    .delete(Budgets)
    .where(and(eq(Budgets.id, numericId), eq(Budgets.createdBy, email)))
    .returning();

  return { success: true, data: result };
}
