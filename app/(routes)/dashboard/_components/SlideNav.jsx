import React from 'react'
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

function SlideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icons: LayoutGrid
    },
    {
      id: 2,
      name: 'Budgets',
      icons: PiggyBank
    },
    {
      id: 3,
      name: 'Expenses',
      icons: ReceiptText
    },
    {
      id: 4,
      name: 'Upgrade',
      icons: ShieldCheck
    },
  ];

  return (
    <div className='h-screen p-5 border shadow-sm relative flex flex-col justify-between bg-white'>
      <div>
        <Image
          src='/logo.svg'
          alt='logo'
          width={160}
          height={20}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
        <div className='mt-6'>
          {menuList.map((menu) => (
            <h2
              key={menu.id}
              className='flex gap-2 items-center text-gray-700 font-medium p-3 cursor-pointer rounded-md hover:text-indigo-600 hover:bg-indigo-50 mb-2 transition-colors'
            >
              <menu.icons className='w-5 h-5' />
              {menu.name}
            </h2>
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
