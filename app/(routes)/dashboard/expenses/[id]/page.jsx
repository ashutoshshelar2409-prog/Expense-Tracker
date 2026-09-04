"use client"
import React, { use, useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses as ExpensesTable } from '@/utils/schema';
import { getTableColumns, sql, eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import { Trash, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EditExpense from '../_components/EditExpense';
import EditBudget from '../../budgets/_components/EditBudget';

function Expenses({ params }) {
    const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
    const id = resolvedParams?.id;
    const { user } = useUser();
    const router = useRouter();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && id) {
            getBudgetInfo();
            getExpensesList();
        }
    }, [user, id]);

    const getBudgetInfo = async () => {
        try {
            const email = user?.primaryEmailAddress?.emailAddress;
            if (!email || !id) return;

            const result = await db.select({
                ...getTableColumns(Budgets),
                totalSpend: sql`COALESCE(sum(CAST(${ExpensesTable.amount} AS NUMERIC)), 0)`.mapWith(Number),
                totalItem: sql`count(${ExpensesTable.id})`.mapWith(Number)
            }).from(Budgets)
                .leftJoin(ExpensesTable, eq(Budgets.id, ExpensesTable.budgetId))
                .where(eq(Budgets.createdBy, email))
                .where(eq(Budgets.id, Number(id)))
                .groupBy(Budgets.id, Budgets.name, Budgets.amount, Budgets.icon, Budgets.createdBy);

            if (result && result.length > 0) {
                setBudgetInfo(result[0]);
            }
        } catch (error) {
            console.error("Error fetching budget info:", error);
            toast.error("Failed to load budget details");
        }
    };

    const getExpensesList = async () => {
        try {
            if (!id) return;
            const result = await db.select().from(ExpensesTable)
                .where(eq(ExpensesTable.budgetId, Number(id)))
                .orderBy(desc(ExpensesTable.id));
            setExpensesList(result || []);
        } catch (error) {
            console.error("Error fetching expenses list:", error);
        }
    };

    const addNewExpense = async () => {
        if (!name || !amount) {
            toast.warning("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const currentDate = new Date().toLocaleDateString('en-GB');
            const result = await db.insert(ExpensesTable).values({
                name: name,
                amount: amount,
                budgetId: Number(id),
                createdAt: currentDate
            }).returning();

            if (result) {
                toast.success("New Expense Added!");
                setName('');
                setAmount('');
                getBudgetInfo();
                getExpensesList();
            }
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error("Failed to add expense");
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
                getBudgetInfo();
                getExpensesList();
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error("Failed to delete expense");
        }
    };

    const deleteBudget = async () => {
        if (!window.confirm("Are you sure you want to delete this budget and all its expenses?")) {
            return;
        }
        try {
            await db.delete(ExpensesTable).where(eq(ExpensesTable.budgetId, Number(id)));
            await db.delete(Budgets).where(eq(Budgets.id, Number(id)));
            toast.success("Budget Deleted Successfully");
            router.replace('/dashboard/budgets');
        } catch (error) {
            console.error("Error deleting budget:", error);
            toast.error("Failed to delete budget");
        }
    };

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex justify-between items-center text-slate-800'>
                <span className='flex gap-2 items-center'>
                    <Link href="/dashboard/budgets">
                        <ArrowLeft className='cursor-pointer w-6 h-6 hover:text-indigo-600 transition-colors' />
                    </Link>
                    My Expenses
                </span>
                <div className='flex gap-2 items-center'>
                    <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />
                    <button
                        onClick={deleteBudget}
                        className='flex gap-2 items-center bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm'>
                        <Trash className='w-4 h-4' /> Delete Budget
                    </button>
                </div>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6'>
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className='h-45 w-full bg-slate-100 animate-pulse rounded-2xl border border-slate-200/60' />
                )}

                {/* Add Expense Form */}
                <div className='border border-slate-200/80 rounded-2xl p-5 bg-white shadow-sm'>
                    <h2 className='font-bold text-lg text-slate-800 mb-4'>Add Expense</h2>
                    <div className='space-y-4'>
                        <div>
                            <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5'>
                                Expense Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Home Decor"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all'
                            />
                        </div>
                        <div>
                            <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5'>
                                Expense Amount
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 4500"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all'
                            />
                        </div>
                        <button
                            disabled={!(name && amount) || loading}
                            onClick={addNewExpense}
                            className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm'>
                            {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Add New Expense'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Expenses List Table */}
            <div className='mt-8'>
                <h2 className='font-bold text-xl text-slate-800 mb-4'>Latest Expenses</h2>
                {expensesList.length > 0 ? (
                    <div className='border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm'>
                        <div className='grid grid-cols-4 bg-slate-50 p-4 border-b border-slate-200/80 font-bold text-xs uppercase tracking-wider text-slate-500'>
                            <h2>Name</h2>
                            <h2>Amount</h2>
                            <h2>Date</h2>
                            <h2 className='text-right pr-4'>Action</h2>
                        </div>
                        {expensesList.map((expense) => (
                            <div key={expense.id} className='grid grid-cols-4 p-4 border-b border-slate-100 text-sm font-medium text-slate-700 items-center hover:bg-slate-50/80 transition-colors'>
                                <h2>{expense.name}</h2>
                                <h2 className='text-indigo-600 font-semibold'>₹{Number(expense.amount).toLocaleString('en-IN')}</h2>
                                <h2 className='text-slate-400 text-xs'>{expense.createdAt}</h2>
                                <div className='text-right pr-2 flex items-center justify-end gap-1'>
                                    <EditExpense expense={expense} refreshData={() => { getBudgetInfo(); getExpensesList(); }} />
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
                    <div className='p-8 text-center border border-dashed border-slate-200 rounded-2xl text-slate-400 font-medium text-sm bg-slate-50/50'>
                        No expenses found for this budget.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Expenses;