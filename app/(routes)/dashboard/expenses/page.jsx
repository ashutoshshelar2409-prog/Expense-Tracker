'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses as ExpensesTable } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { Trash } from 'lucide-react';
import { toast } from '@/components/ui/toast';
import Link from 'next/link';
import EditExpense from './_components/EditExpense';

function ExpensesPage() {
    const { user } = useUser();
    const [expensesList, setExpensesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getAllExpenses();
        }
    }, [user]);

    const getAllExpenses = async () => {
        try {
            setLoading(true);
            const email = user?.primaryEmailAddress?.emailAddress;
            if (!email) return;

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

            setExpensesList(result || []);
        } catch (error) {
            console.error("Error fetching all expenses:", error);
            toast.error("Failed to load expenses");
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (expense) => {
        try {
            const result = await db.delete(ExpensesTable)
                .where(eq(ExpensesTable.id, expense.id))
                .returning();

            if (result) {
                toast.success("Expense Deleted!");
                getAllExpenses();
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error("Failed to delete expense");
        }
    };

    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl text-slate-800 mb-6'>My Expenses</h2>
            {loading ? (
                <div className='w-full bg-slate-100 rounded-2xl h-60 animate-pulse border border-slate-200/60' />
            ) : expensesList.length > 0 ? (
                <div className='border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm'>
                    <div className='grid grid-cols-5 bg-slate-50 p-4 border-b border-slate-200/80 font-bold text-xs uppercase tracking-wider text-slate-500'>
                        <h2>Name</h2>
                        <h2>Amount</h2>
                        <h2>Budget</h2>
                        <h2>Date</h2>
                        <h2 className='text-right pr-4'>Action</h2>
                    </div>
                    {expensesList.map((expense) => (
                        <div key={expense.id} className='grid grid-cols-5 p-4 border-b border-slate-100 text-sm font-medium text-slate-700 items-center hover:bg-slate-50/80 transition-colors'>
                            <h2>{expense.name}</h2>
                            <h2 className='text-indigo-600 font-semibold'>₹{Number(expense.amount).toLocaleString('en-IN')}</h2>
                            <h2>
                                <Link href={`/dashboard/expenses/${expense.budgetId}`} className='text-indigo-600 hover:underline bg-indigo-50 px-2.5 py-1 rounded-md text-xs font-semibold'>
                                    {expense.budgetName}
                                </Link>
                            </h2>
                            <h2 className='text-slate-400 text-xs'>{expense.createdAt}</h2>
                            <div className='text-right pr-2 flex items-center justify-end gap-1'>
                                <EditExpense expense={expense} refreshData={getAllExpenses} />
                                <button
                                    onClick={() => deleteExpense(expense)}
                                    className='text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-all'
                                    title="Delete Expense">
                                    <Trash className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='p-12 text-center border border-dashed border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center gap-3'>
                    <p className='text-slate-500 font-medium text-base'>No expenses recorded yet.</p>
                    <Link href="/dashboard/budgets" className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all shadow-sm'>
                        Go to Budgets
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ExpensesPage;
