'use client';
import { UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import SlideNav from './SlideNav';

function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='p-4 md:p-5 shadow-sm border-b bg-white flex justify-between items-center sticky top-0 z-40'>
      {/* Mobile Menu SlideSlider Toggle Button */}
      <div className='flex items-center gap-3'>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='md:hidden flex items-center gap-2 p-2 px-3 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all font-semibold text-sm shadow-sm'
          aria-label='Toggle mobile navigation menu'
        >
          <Menu className='w-5 h-5' />
          <span>Menu</span>
        </button>
      </div>

      {/* User Account / Profile */}
      <div className='flex items-center gap-3'>
        <UserButton />
      </div>

      {/* Mobile SlideSlider Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-50 md:hidden flex'>
          {/* Backdrop */}
          <div
            className='fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity'
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-out Sidebar Drawer */}
          <div className='relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-10 flex flex-col transform transition-transform duration-300 ease-out'>
            <div className='p-3 flex justify-end border-b border-slate-100 bg-slate-50/50'>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className='p-2 rounded-xl text-slate-500 hover:bg-slate-200/60 transition-all'
                aria-label='Close menu'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
            <div className='flex-1 overflow-y-auto'>
              <SlideNav closeMobileMenu={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;
