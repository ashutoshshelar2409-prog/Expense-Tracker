"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import { getTableColumns, sql, eq, desc } from 'drizzle-orm';
import { Budgets, Expenses as ExpensesTable } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import BarChartDashboard from './_components/BarChartDashboard';
import ExpenseListTable from './_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getBudgetList();
      getExpensesList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      setLoading(true);
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`COALESCE(sum(CAST(${ExpensesTable.amount} AS NUMERIC)), 0)`.mapWith(Number),
        totalItem: sql`count(${ExpensesTable.id})`.mapWith(Number),
      }).from(Budgets)
        .leftJoin(ExpensesTable, eq(Budgets.id, ExpensesTable.budgetId))
        .where(eq(Budgets.createdBy, email))
        .groupBy(Budgets.id, Budgets.name, Budgets.amount, Budgets.icon, Budgets.createdBy)
        .orderBy(desc(Budgets.id));

      setBudgetList(result || []);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    } finally {
      setLoading(false);
    }
  };

  const getExpensesList = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const result = await db.select({
        id: ExpensesTable.id,
        name: ExpensesTable.name,
        amount: ExpensesTable.amount,
        createdAt: ExpensesTable.createdAt,
      }).from(ExpensesTable)
        .innerJoin(Budgets, eq(ExpensesTable.budgetId, Budgets.id))
        .where(eq(Budgets.createdBy, email))
        .orderBy(desc(ExpensesTable.id));

      setExpensesList(result || []);
    } catch (error) {
      console.error("Error fetching expenses list:", error);
    }
  };

  const refreshAll = () => {
    getBudgetList();
    getExpensesList();
  };

  return (
    <div className='p-4 sm:p-6 md:p-8'>
      <h2 className='font-bold text-2xl sm:text-3xl text-slate-800'>Hi, {user?.fullName} 👋</h2>
      <p className='text-gray-500 text-sm mt-1'>
        Here's what's happening with your money. <strong>Let's manage your expenses!</strong>
      </p>

      <CardInfo budgetList={budgetList} loading={loading} />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-6'>
        {/* Main Section: Chart & Expenses */}
        <div className='md:col-span-2 space-y-6'>
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable expensesList={expensesList} refreshData={refreshAll} loading={loading} />
        </div>

        {/* Sidebar: Active Budgets Overview */}
        <div className='md:col-span-1 border border-slate-200/80 rounded-2xl p-5 bg-white shadow-sm h-fit'>
          <h2 className='text-base font-bold text-slate-800 mb-4'>Active Budgets</h2>
          {loading ? (
            <div className='space-y-3'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='h-12 bg-slate-100 animate-pulse rounded-xl' />
              ))}
            </div>
          ) : budgetList.length > 0 ? (
            <ul className='divide-y divide-slate-100'>
              {budgetList.slice(0, 5).map((budget) => (
                <li key={budget.id} className='py-3 flex items-center justify-between'>
                  <span className='font-medium text-sm text-slate-700 flex items-center gap-2'>
                    <span>{budget.icon || '💰'}</span>
                    <span>{budget.name}</span>
                  </span>
                  <span className='text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg'>
                    ₹{Number(budget.totalSpend || 0).toLocaleString('en-IN')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-xs text-slate-400 text-center py-4'>No active budgets set up yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
