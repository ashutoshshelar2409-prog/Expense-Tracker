'use client';
import React from 'react';
import Link from 'next/link';

function BudgetItem({ budget }) {
  const amountNum = Number(budget?.amount || 0);
  const totalSpendNum = Number(budget?.totalSpend || 0);
  const formattedAmount = amountNum.toLocaleString('en-IN');
  const formattedSpend = totalSpendNum.toLocaleString('en-IN');
  const remaining = (amountNum - totalSpendNum) > 0 ? (amountNum - totalSpendNum) : 0;
  const formattedRemaining = remaining.toLocaleString('en-IN');

  const calculateProgressPerc = () => {
    if (!amountNum || amountNum === 0) return 0;
    const perc = (totalSpendNum / amountNum) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <Link href={'/dashboard/expenses/' + budget?.id}>
      <div className='p-5 border border-slate-200/80 rounded-2xl bg-white hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-45 group'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-xl bg-slate-100/80 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform'>
              {budget?.icon || '💰'}
            </div>
            <div>
              <h2 className='font-semibold text-slate-800 text-base line-clamp-1'>
                {budget?.name}
              </h2>
              <p className='text-xs text-slate-400 font-medium mt-0.5'>
                {budget?.totalItem || 0} Items
              </p>
            </div>
          </div>
          <h2 className='font-bold text-indigo-600 text-lg'>
            ₹{formattedAmount}
          </h2>
        </div>

        <div className='mt-4'>
          <div className='flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium'>
            <span>₹{formattedSpend} spent</span>
            <span>₹{formattedRemaining} remaining</span>
          </div>
          <div className='w-full bg-slate-100 rounded-full h-2 overflow-hidden'>
            <div
              className='bg-indigo-600 h-2 rounded-full transition-all duration-500'
              style={{ width: `${calculateProgressPerc()}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
