import React from 'react'
import SlideNav from './_components/SlideNav'

function Dashboardlayout({children}) {
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SlideNav/>
        </div>
        <div className='md:ml-64 bg-green-200'>
          <Dashboardlayout/>
            {children}
        </div>
    </div>
  )
}

export default Dashboardlayout
