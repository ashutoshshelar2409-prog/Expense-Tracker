'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Trash } from 'lucide-react';
import { toast } from '@/components/ui/toast';
import Link from 'next/link';
import EditExpense from './_components/EditExpense';
import { getUserExpenses, deleteExpense as deleteExpenseAction } from '@/actions/expenses';

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
            const result = await getUserExpenses();
            setExpensesList(result || []);
        } catch (error) {
            console.error("Error fetching all expenses:", error);
            toast.error("Failed to load expenses");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExpense = async (expense) => {
        try {
            const res = await deleteExpenseAction(expense.id);

            if (res?.success) {
                toast.success("Expense Deleted!");
                getAllExpenses();
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error(error.message || "Failed to delete expense");
        }
    };

    return (
        <div className='p-4 sm:p-6 md:p-10'>
            <h2 className='font-bold text-2xl sm:text-3xl text-slate-800 mb-6'>My Expenses</h2>
            {loading ? (
                <div className='w-full bg-slate-100 rounded-2xl h-60 animate-pulse border border-slate-200/60' />
            ) : expensesList.length > 0 ? (
                <div className='border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm overflow-x-auto'>
                    <div className='min-w-150'>
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
                                        onClick={() => handleDeleteExpense(expense)}
                                        className='text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-all'
                                        title="Delete Expense">
                                        <Trash className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
