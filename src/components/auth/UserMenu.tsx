'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, LogOut, LogIn, ChevronDown, Cloud, ShieldCheck, LayoutDashboard, Sparkles } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const router = useRouter();
  const { user, profile, signOut, openAuthModal, isLoading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse border border-slate-200" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={() => openAuthModal('signin')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-blue-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
        title="Sign in to save and sync resumes to the cloud"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Sign In</span>
      </button>
    );
  }

  const userDisplayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'My Account';

  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-border cursor-pointer"
        title="Account & Cloud Sync"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
          {userInitial}
        </div>
        <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
          {userDisplayName}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400 mr-1" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-card rounded-xl shadow-xl border border-slate-100 dark:border-border py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-border">
            <div className="font-bold text-slate-900 dark:text-foreground truncate">{userDisplayName}</div>
            <div className="text-[11px] text-slate-500 dark:text-muted-foreground truncate">{user.email}</div>
            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800">
              <Cloud className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Cloud Sync Active</span>
            </div>
          </div>

          <div className="py-1 border-b border-slate-100 dark:border-border">
            <Link
              href="/dashboard"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/50 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/create"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-muted/50 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Build Free</span>
            </Link>
          </div>

          <button
            onClick={async () => {
              setDropdownOpen(false);
              await signOut();
              router.push('/');
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left font-medium transition-colors cursor-pointer mt-0.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
