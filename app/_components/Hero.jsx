'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

const SparklesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

function Hero() {
  const { isSignedIn } = useUser();

  const getStartedUrl = isSignedIn ? '/dashboard' : '/sign-in';

  return (
    <section className="bg-gray-50/50 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Banner Text & CTAs */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
            <SparklesIcon className="w-3.5 h-3.5" />
            Smart Expense & Budget Tracker
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Track your expenses and{' '}
            <span className="bg-linear-to-r text-indigo-600 bg-clip-text ">
              take control
            </span>{' '}
            of your budget.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Track every rupee. Manage your budgets. Build smarter spending habits and reach your financial goals effortlessly.
          </p>

          <div className="mt-8 flex items-center justify-center gap-x-4">
            <Link
              href={getStartedUrl}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all"
            >
              Get Started
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <a
              href="#dashboard-preview"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Dashboard Preview Image Container */}
        <div id="dashboard-preview" className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-6xl rounded-2xl p-2 bg-linear-to-b from-indigo-100/50 via-white to-gray-100 border border-indigo-100 shadow-2xl overflow-hidden">
            <div className="rounded-xl overflow-hidden bg-white shadow-inner">
              <Image
                src="/dashboard.png"
                alt="Expense Tracker Dashboard"
                width={1200}
                height={675}
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;