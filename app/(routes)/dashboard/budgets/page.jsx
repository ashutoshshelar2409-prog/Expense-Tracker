import React from 'react'
import BudgetList from './_components/BudgetList'

function Budgets() {
  return (
    <div className='p-4 sm:p-6 md:p-10'>
      <h2 className='font-bold text-2xl sm:text-3xl text-slate-800'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default Budgets