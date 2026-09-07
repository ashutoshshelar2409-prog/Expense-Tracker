import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React from 'react'

function CardInfo({ budgetList = [], loading = false }) {

  const totalBudget = (budgetList || []).reduce((acc, budget) => acc + Number(budget.amount || 0), 0);
  const totalSpend = (budgetList || []).reduce((acc, budget) => acc + Number(budget.totalSpend || 0), 0);
  const totalItems = (budgetList || []).length;

  if (loading) {
    return (
      <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className='h-27.5 bg-slate-200/80 rounded-2xl animate-pulse p-5 sm:p-7 flex items-center justify-between border border-slate-100'>
            <div className='flex flex-col gap-2 w-full'>
              <div className='h-4 w-24 bg-slate-300/80 rounded-md animate-pulse' />
              <div className='h-7 w-32 bg-slate-300/80 rounded-md animate-pulse' />
            </div>
            <div className='h-12 w-12 bg-slate-300/80 rounded-full animate-pulse shrink-0' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <div className='p-5 sm:p-7 border border-slate-200/80 bg-white rounded-2xl shadow-sm flex justify-between items-center hover:shadow-md transition-all'>
        <div>
          <h2 className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Total Budget</h2>
          <h2 className='font-bold text-2xl text-slate-800 mt-1'>₹{totalBudget.toLocaleString('en-IN')}</h2>
        </div>
        <div className='p-3 bg-indigo-50 text-indigo-600 rounded-full'>
          <PiggyBank className='h-8 w-8' />
        </div>
      </div>
      <div className='p-5 sm:p-7 border border-slate-200/80 bg-white rounded-2xl shadow-sm flex justify-between items-center hover:shadow-md transition-all'>
        <div>
          <h2 className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Total Spend</h2>
          <h2 className='font-bold text-2xl text-slate-800 mt-1'>₹{totalSpend.toLocaleString('en-IN')}</h2>
        </div>
        <div className='p-3 bg-indigo-50 text-indigo-600 rounded-full'>
          <ReceiptText className='h-8 w-8' />
        </div>
      </div>
      <div className='p-5 sm:p-7 border border-slate-200/80 bg-white rounded-2xl shadow-sm flex justify-between items-center hover:shadow-md transition-all'>
        <div>
          <h2 className='text-xs font-semibold uppercase tracking-wider text-slate-500'>No. of Budgets</h2>
          <h2 className='font-bold text-2xl text-slate-800 mt-1'>{totalItems}</h2>
        </div>
        <div className='p-3 bg-indigo-50 text-indigo-600 rounded-full'>
          <Wallet className='h-8 w-8' />
        </div>
      </div>
    </div>
  )
}

export default CardInfo
