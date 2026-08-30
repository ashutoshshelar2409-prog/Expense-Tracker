"use client"
import React, { useEffect } from 'react'
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SlideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icons: LayoutGrid,
      path:'/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icons: PiggyBank,
      path:'/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icons: ReceiptText,
      path:'/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icons: ShieldCheck,
      path:'/dashboard/upgrade'

    },
  ];

  const path=usePathname();

  useEffect(() => {
    // track active route change if needed
  }, [path])
  return (
    <div className='h-screen p-5 border-b shadow-md relative flex flex-col justify-between bg-white'>
      <div>
        <Image
          src='/logo.svg'
          alt='logo'
          width={160}
          height={20}
          priority
          style={{ width: 'auto', height: 'auto' }}/>
        <div className='mt-6'>
          {menuList.map((menu) => (
            <Link href={menu.path} key={menu.path}>
            <h2
              className={`flex gap-2 items-center
                 text-gray-700 font-medium 
                 mb-2
                 p-5 cursor-pointer rounded-md
                 hover:text-indigo-600 hover:bg-indigo-50 
                ${path == menu.path && 'text-indigo-600 bg-indigo-100'}`}
              >
              <menu.icons className='w-5 h-5'/>
              {menu.name}
            </h2>
              </Link>
            ))}
        </div>
      </div>
        <div className='pb-4 flex gap-3 items-center text-gray-700 font-medium'>
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SlideNav;
