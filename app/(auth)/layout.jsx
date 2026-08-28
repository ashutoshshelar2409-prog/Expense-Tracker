import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <div className="bg-white min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Banner Side (Desktop only) */}
        <section className="hidden lg:relative lg:flex lg:col-span-5 lg:h-full xl:col-span-6 bg-slate-900 items-end">
          <img
            alt="Student Budget & Expense Tracker Banner"
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1770&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
          />

          <div className="relative p-12 z-10">
            <Link className="block mb-6" href="/">
              <Image
                src="/logo.svg"
                alt="Expense-Tracker Logo"
                width={210}
                height={50}
                className="brightness-0 invert"
                priority
              />
            </Link>

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Take Control of Your Student Budget
            </h2>

            <p className="mt-4 leading-relaxed text-slate-200">
              Track every rupee, set smart spending limits, and achieve financial clarity throughout your academic journey.
            </p>
          </div>
        </section>

        {/* Form Side (Mobile & Desktop) */}
        <main className="flex min-h-screen flex-col items-center justify-start lg:justify-center px-4 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          {/* Logo on Mobile (Top aligned) */}
          <div className="w-full max-w-md flex justify-center mb-6 lg:hidden">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Expense-Tracker Logo"
                width={180}
                height={42}
                priority
              />
            </Link>
          </div>

          {/* Form Container with guaranteed layout space for Clerk component */}
          <div className="w-full max-w-md flex justify-center items-center min-h-120">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
