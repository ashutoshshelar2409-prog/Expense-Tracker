'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="p-5 flex justify-between items-center border-b shadow-sm bg-white">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={160}
          height={40}
          priority
        />
      </Link>
      <div className="flex items-center gap-4">
        {isLoaded && isSignedIn ? (
          <>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;