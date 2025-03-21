"use client";

import { signOut } from 'next-auth/react';
import Link from "next/link";

export default function AppSidebar() {
  return (
    <aside className="menu p-4 w-80 h-screen bg-base-200 text-base-content text-xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl font-bold">PMA</span>
      </div>
      <ul className='space-y-4'>
        <li>
          <Link href="/" className="flex items-center gap-2">
            <span className="icon">🏠</span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/task" className="flex items-center gap-2">
            <span className="icon">✅</span>
            Tasks
          </Link>
        </li>
        <li>
          <Link href="/team" className="flex items-center gap-2">
            <span className="icon">👥</span>
            Team Management
          </Link>
        </li>
        <li>
          <Link href="/account" className="flex items-center gap-2">
            <span className="icon">👤</span>
            Account
          </Link>
        </li>
        <li>
          <button className="flex items-center gap-2" onClick={() => void signOut()}>
            <span className="icon">🚪</span>
            Log out
          </button>
        </li>
      </ul>
    </aside>
  );
}