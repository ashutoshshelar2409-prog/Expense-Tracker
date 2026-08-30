'use client';
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      setLoading(true);
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const result = await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, email))
        .orderBy(desc(Budgets.id));

      setBudgetList(result || []);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={getBudgetList} />
        {loading ? (
          [1, 2, 3].map((item, index) => (
            <div key={index} className='w-full bg-slate-100 rounded-2xl h-45 animate-pulse border border-slate-200/60' />
          ))
        ) : (
          budgetList?.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;
