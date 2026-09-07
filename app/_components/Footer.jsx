'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Custom SVG icons for maximum compatibility
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ExternalLinkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Expense-Tracker Logo"
                width={160}
                height={30}
                className="brightness-0 invert"
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Take full control of your personal expenses and student budget. Simple, smart, and efficient financial tracking for everyone.
            </p>
          </div>

          {/* Social Profiles & Contact Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
              Connect With Creator
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/itz_ashu.s_21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 transition-all group"
              >
                <div className="p-2 rounded-md bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Instagram</p>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center gap-1">
                    itz_ashu.s_21
                    <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/ashutoshshelar2409-prog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 transition-all group"
              >
                <div className="p-2 rounded-md bg-slate-700 text-white">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">GitHub</p>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center gap-1">
                    ashutoshshelar2409-prog
                    <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ashutosh-shelar-7986b5390/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 transition-all group"
              >
                <div className="p-2 rounded-md bg-blue-600 text-white">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">LinkedIn</p>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center gap-1">
                    Ashutosh Shelar
                    <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:ashutosh.shelar2409@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 transition-all group"
              >
                <div className="p-2 rounded-md bg-indigo-600 text-white">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white truncate flex items-center gap-1">
                    ashutosh.shelar2409@gmail.com
                    <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Expense-Tracker by Ashutosh Shelar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, Tailwind CSS & Clerk
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
