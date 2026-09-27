"use client"
import React, { useEffect } from 'react'
import SlideNav from './_components/SlideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { checkUserHasBudgets } from '@/actions/budgets'

function Dashboardlayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user])

  const checkUserBudgets = async () => {
    try {
      const res = await checkUserHasBudgets();
      if (!res?.hasBudgets) {
        router.replace('/dashboard/budgets');
      }
    } catch (error) {
      console.error("Error checking user budgets:", error);
    }
  }

  return (
    <div>
      <div className='fixed md:w-64 hidden md:block'>
        <SlideNav />
      </div>
      <div className='md:ml-64'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default Dashboardlayout