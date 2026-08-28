import React from 'react'
import SlideNav from './_components/SlideNav'
import DashboardHeader from './_components/DashboardHeader'

function Dashboardlayout({children}) {
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SlideNav/>
        </div>
        <div className='md:ml-64'>
          <DashboardHeader/>
          {children}
        </div>
    </div>
  )
}

export default Dashboardlayout
