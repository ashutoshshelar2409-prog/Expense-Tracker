import React from 'react'
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

function SlideNav() {
  const menuList=[
    {
      id:1,
      name:'Dashboard',
      icons:LayoutGrid

    },
    {
      id:2,
      name:'Budgets',
      icons:PiggyBank

    },
    {
      id:3,
      name:'Expenses',
      icons:ReceiptText

    },
    {
      id:4,
      name:'Upgrade',
      icons:ShieldCheck

    },
  ]
  return (
    <div className='h-screen p-5 border shadow-sm'>
      <Image src={'/logo.svg'}
      alt='logo'
      width={160}
      height={100}/>
      <div className='mt-6'>
        {menuList.map((menu,index)=>(
          <h2 className='flex gap-2 items bg-center text-black font-medium p-5 cursor-pointer rounded-md hover:text-shadow-black hover:bg-gray-200'>
            <menu.icons/>
            {menu.name}
          </h2>
        ))}
      </div>
        <div className='fixed bottom-1 p-6 flex gap-3 items-center-safe'>
          <UserButton/>
           Profile
        </div>
    </div>
  )
}

export default SlideNav
