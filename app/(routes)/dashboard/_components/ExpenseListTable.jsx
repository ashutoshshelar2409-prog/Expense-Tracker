'use client';
import React from 'react';
import { db } from '@/utils/dbConfig';
import { Expenses as ExpensesTable } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import { toast } from '@/components/ui/toast';
import Link from 'next/link';
import EditExpense from '../expenses/_components/EditExpense';

function ExpenseListTable({ expensesList = [], refreshData, loading = false }) {
    const deleteExpense = async (expense) => {
        try {
            const result = await db.delete(ExpensesTable)
                .where(eq(ExpensesTable.id, expense.id))
                .returning();

            if (result) {
                toast.success("Expense Deleted!");
                if (refreshData) {
                    refreshData();
                }
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error("Failed to delete expense");
        }
    };

    return (
        <div className='mt-3'>
            <h2 className='font-bold text-lg text-slate-800 mb-3'>Latest Expenses</h2>
            {loading ? (
                <div className='w-full bg-slate-100 rounded-2xl h-40 animate-pulse border border-slate-200/60' />
            ) : expensesList && expensesList.length > 0 ? (
                <div className='border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm overflow-x-auto'>
                    <div className='min-w-125'>
                        <div className='grid grid-cols-4 bg-slate-50 p-3 border-b border-slate-200/80 font-bold text-xs uppercase tracking-wider text-slate-500'>
                            <h2>Name</h2>
                            <h2>Amount</h2>
                            <h2>Date</h2>
                            <h2 className='text-right pr-4'>Action</h2>
                        </div>
                        {expensesList.map((expense) => (
                            <div key={expense.id} className='grid grid-cols-4 p-3 border-b border-slate-100 text-sm font-medium text-slate-700 items-center hover:bg-slate-50/80 transition-colors'>
                                <h2>{expense.name}</h2>
                                <h2 className='text-indigo-600 font-semibold'>₹{Number(expense.amount).toLocaleString('en-IN')}</h2>
                                <h2 className='text-slate-400 text-xs'>{expense.createdAt}</h2>
                                <div className='text-right pr-2 flex items-center justify-end gap-1'>
                                    <EditExpense expense={expense} refreshData={refreshData} />
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
                </div>
            ) : (
                <div className='p-6 text-center border border-dashed border-slate-200 rounded-2xl bg-white text-slate-400 text-xs font-medium'>
                    No recent expenses found.
                </div>
            )}
        </div>
    );
}

export default ExpenseListTable;
