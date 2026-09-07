"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo';
import { getTableColumns, sql, eq, desc } from 'drizzle-orm';
import { Budgets, Expenses as ExpensesTable } from '@/utils/schema';
import { db } from '@/utils/dbConfig';

function Dashboard() {
  const {user}=useUser();

    const [budgetList, setBudgetList] = useState([]);
    const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async() => {
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
    return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's What Happenning With Your Money, <strong>Let Manage Your Expense</strong></p>
      <CardInfo budgetList={budgetList} loading={loading} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-4 '>
        <div className='md:col-span-2'>
          <BarChartDashboard
          budgetList={budgetList} />
        </div>
        <div className='md:col-span-1'>
          {budgetList.map((budget) => (
            <div key={budget.id} className='border border-gray-300 rounded-lg p-4 mb-4'>
              <h3 className='font-semibold text-lg'>{budget.name}</h3>
              <p className='text-gray-500'>Total Spent: ₹{budget.totalSpend.toFixed(2)}</p>
              <p className='text-gray-500'>Total Items: {budget.totalItem}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
