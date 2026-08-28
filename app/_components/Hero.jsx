import React from 'react';
import Link from 'next/link';

function Hero() {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Track your expenses and
            <strong className="text-indigo-600"> take control </strong>
            of your student budget.
          </h1>
          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Track every rupee. Manage your budget. Build smarter spending habits.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="/sign-in"
            >
              Get Started
            </Link>

            <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#learn-more"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;