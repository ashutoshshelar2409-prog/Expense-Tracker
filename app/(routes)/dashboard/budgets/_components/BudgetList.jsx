'use client';
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';
import { useUser } from '@clerk/nextjs';
import { getUserBudgets } from '@/actions/budgets';

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
      const result = await getUserBudgets();
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
