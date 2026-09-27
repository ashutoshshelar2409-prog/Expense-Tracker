import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(),
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
});

export const Expenses = pgTable('expense', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id),
    createdAt: varchar('createdAt').notNull()
});