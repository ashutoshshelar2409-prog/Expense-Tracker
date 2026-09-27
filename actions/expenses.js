'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses as ExpensesTable } from '@/utils/schema';
import { eq, and, desc } from 'drizzle-orm';

/**
 * Helper to retrieve and verify the authenticated Clerk user's email.
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
 * Fetches all expenses across all budgets owned by the authenticated user.
 */
export async function getUserExpenses() {
  const email = await getAuthUserEmail();

  const result = await db
    .select({
      id: ExpensesTable.id,
      name: ExpensesTable.name,
      amount: ExpensesTable.amount,
      createdAt: ExpensesTable.createdAt,
      budgetName: Budgets.name,
      budgetId: Budgets.id,
    })
    .from(ExpensesTable)
    .innerJoin(Budgets, eq(ExpensesTable.budgetId, Budgets.id))
    .where(eq(Budgets.createdBy, email))
    .orderBy(desc(ExpensesTable.id));

  return result || [];
}

/**
 * Fetches expenses for a specific budget ID, verifying that the budget belongs to the authenticated user.
 */
export async function getExpensesByBudgetId(budgetId) {
  const email = await getAuthUserEmail();
  const numericBudgetId = Number(budgetId);
  if (isNaN(numericBudgetId)) return [];

  const result = await db
    .select({
      id: ExpensesTable.id,
      name: ExpensesTable.name,
      amount: ExpensesTable.amount,
      createdAt: ExpensesTable.createdAt,
      budgetId: ExpensesTable.budgetId,
    })
    .from(ExpensesTable)
    .innerJoin(Budgets, eq(ExpensesTable.budgetId, Budgets.id))
    .where(and(eq(ExpensesTable.budgetId, numericBudgetId), eq(Budgets.createdBy, email)))
    .orderBy(desc(ExpensesTable.id));

  return result || [];
}

/**
 * Creates a new expense inside a target budget, verifying budget ownership first.
 */
export async function createExpense({ name, amount, budgetId }) {
  const email = await getAuthUserEmail();
  const numericBudgetId = Number(budgetId);

  if (!name || !amount || isNaN(numericBudgetId)) {
    throw new Error("Expense name, amount, and valid budget ID are required.");
  }

  // Enforce ownership check on target budget before inserting expense
  const budgetCheck = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, numericBudgetId), eq(Budgets.createdBy, email)));

  if (!budgetCheck || budgetCheck.length === 0) {
    throw new Error("Unauthorized: Target budget not found or you do not own it.");
  }

  const currentDate = new Date().toLocaleDateString('en-GB');

  const result = await db
    .insert(ExpensesTable)
    .values({
      name: String(name).trim(),
      amount: String(amount).trim(),
      budgetId: numericBudgetId,
      createdAt: currentDate,
    })
    .returning();

  return { success: true, data: result };
}

/**
 * Updates an expense item, verifying that it belongs to a budget owned by the authenticated user.
 */
export async function updateExpense({ expenseId, name, amount }) {
  const email = await getAuthUserEmail();
  const numericExpenseId = Number(expenseId);

  if (!name || !amount || isNaN(numericExpenseId)) {
    throw new Error("Expense name, amount, and valid expense ID are required.");
  }

  // Enforce ownership check on the expense via its budget creator
  const existing = await db
    .select({ id: ExpensesTable.id })
    .from(ExpensesTable)
    .innerJoin(Budgets, eq(ExpensesTable.budgetId, Budgets.id))
    .where(and(eq(ExpensesTable.id, numericExpenseId), eq(Budgets.createdBy, email)));

  if (!existing || existing.length === 0) {
    throw new Error("Unauthorized: Expense not found or you do not have permission to modify it.");
  }

  const result = await db
    .update(ExpensesTable)
    .set({
      name: String(name).trim(),
      amount: String(amount).trim(),
    })
    .where(eq(ExpensesTable.id, numericExpenseId))
    .returning();

  return { success: true, data: result };
}

/**
 * Deletes an expense item, verifying ownership before executing delete.
 */
export async function deleteExpense(expenseId) {
  const email = await getAuthUserEmail();
  const numericExpenseId = Number(expenseId);

  if (isNaN(numericExpenseId)) {
    throw new Error("Invalid expense ID.");
  }

  // Enforce ownership check on the expense via its parent budget creator
  const existing = await db
    .select({ id: ExpensesTable.id })
    .from(ExpensesTable)
    .innerJoin(Budgets, eq(ExpensesTable.budgetId, Budgets.id))
    .where(and(eq(ExpensesTable.id, numericExpenseId), eq(Budgets.createdBy, email)));

  if (!existing || existing.length === 0) {
    throw new Error("Unauthorized: Expense not found or you do not have permission to delete it.");
  }

  const result = await db
    .delete(ExpensesTable)
    .where(eq(ExpensesTable.id, numericExpenseId))
    .returning();

  return { success: true, data: result };
}
