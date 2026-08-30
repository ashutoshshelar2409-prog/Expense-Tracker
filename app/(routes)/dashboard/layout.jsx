"use client"
import React, { useEffect } from 'react'
import SlideNav from './_components/SlideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

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
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      
      const result = await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, email));

      if (result?.length === 0) {
        router.replace('/dashboard/budgets');
      }
    } catch (error) {
      console.error("Error fetching user budgets:", error);
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