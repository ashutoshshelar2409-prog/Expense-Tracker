import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

function Upgrade() {
  return (
    <div className='p-4 sm:p-6 md:p-8 max-w-4xl mx-auto'>
      <div className='text-center space-y-3 mb-10'>
        <div className='inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-2'>
          <ShieldCheck className='w-8 h-8' />
        </div>
        <h1 className='text-3xl font-bold text-slate-800'>Upgrade Your Plan</h1>
        <p className='text-slate-500 text-sm max-w-md mx-auto'>
          Unlock advanced budget analytics, unlimited budget tracking, and instant automated insights.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Free Plan */}
        <div className='border border-slate-200/80 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between'>
          <div>
            <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full'>
              Current Plan
            </span>
            <h2 className='text-2xl font-bold text-slate-800 mt-4'>Free Plan</h2>
            <p className='text-3xl font-extrabold text-slate-900 mt-2'>₹0 <span className='text-xs font-normal text-slate-400'>/ month</span></p>
            <ul className='mt-6 space-y-3 text-sm text-slate-600'>
              <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-500' /> Standard Budget Creation</li>
              <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-500' /> Basic Expense Tracking</li>
              <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-500' /> Indian Rupee (₹) Currency Support</li>
            </ul>
          </div>
          <button disabled className='w-full mt-8 py-2.5 bg-slate-100 text-slate-400 rounded-xl font-medium text-sm cursor-not-allowed'>
            Active Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className='border-2 border-indigo-600 rounded-2xl p-6 bg-white shadow-md flex flex-col justify-between relative overflow-hidden'>
          <div className='absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl'>
            Popular
          </div>
          <div>
            <span className='text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full'>
              Pro Features
            </span>
            <h2 className='text-2xl font-bold text-slate-800 mt-4'>Pro Plan</h2>
            <p className='text-3xl font-extrabold text-slate-900 mt-2'>₹199 <span className='text-xs font-normal text-slate-400'>/ month</span></p>
            <ul className='mt-6 space-y-3 text-sm text-slate-600'>
              <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-indigo-600' /> Unlimited Budgets & Categories</li>
              <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-indigo-600' /> Interactive Chart Analytics</li>
              <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-indigo-600' /> Priority Cloud Data Syncing</li>
              <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-indigo-600' /> Custom Export Options</li>
            </ul>
          </div>
          <button className='w-full mt-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-all shadow-sm'>
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;