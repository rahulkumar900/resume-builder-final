'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Sparkles,
  LayoutTemplate,
  FileCheck2,
  BookOpen,
  Briefcase,
  Layers,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserMenu } from '@/components/auth/UserMenu';
import { useTheme } from '@/context/ThemeContext';

export const PAGE_NAV_LINKS = [
  { href: '/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/ats-checker', label: 'ATS Checker', icon: FileCheck2 },
  { href: '/examples', label: 'Examples', icon: Briefcase },
  { href: '/create', label: 'AI Builder', icon: Sparkles },
  { href: '/blog', label: 'Guides', icon: BookOpen },
];

export function RxNavbar() {
  const { user, profile, openAuthModal, signOut } = useAuth();
  const pathname = usePathname();
  const { mode, setMode, resolvedMode } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Automatically close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDark = mounted ? resolvedMode === 'dark' : false;

  const toggleDarkMode = () => {
    const nextMode = isDark ? 'light' : 'dark';
    setMode(nextMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F7F3]/95 dark:bg-[#100F0C]/95 backdrop-blur-md border-b border-border shadow-xs'
            : 'bg-[#F8F7F3]/80 dark:bg-[#100F0C]/80 backdrop-blur-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Monogram & Name */}
          <div className="flex items-center gap-3 shrink-0 min-w-0">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <Image
                src="/logo.png"
                alt="ResumeBabu"
                width={34}
                height={34}
                className="w-8.5 h-8.5 rounded-lg object-contain shadow-xs shrink-0 transition-transform group-hover:scale-105"
                priority
              />
              <div className="flex flex-col min-w-0">
                <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none truncate">
                  Resume<span className="text-emerald-700 dark:text-emerald-400">Babu</span>
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-mono text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                  AI Career Studio
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Real Page Navigation Links with active highlight */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 bg-slate-900/[0.04] dark:bg-white/[0.06] p-1 rounded-full border border-black/[0.05] dark:border-white/[0.08] backdrop-blur-xs"
          >
            {PAGE_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.08em] font-medium transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Action CTAs & Auth */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Desktop Auth & CTAs */}
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.08em] font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs transition-all cursor-pointer"
                title="Sign in to your account"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.08em] font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs transition-all"
                >
                  <span>Dashboard</span>
                </Link>
                <UserMenu />
              </div>
            )}

            {/* Light / Dark Mode Theme Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:border-emerald-500 dark:hover:border-emerald-400 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs group shrink-0"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with page links & full Auth actions */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F8F7F3]/98 dark:bg-[#100F0C]/98 backdrop-blur-md border-b border-border shadow-xl px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-1">
              {PAGE_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{link.label}</span>
                    </div>
                    {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Auth & CTAs */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
              {!user ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signin');
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/80 dark:border-emerald-800/80 transition-all cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Sign In to Cloud Sync</span>
                  </button>
                  <Link
                    href="/create"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Build Resume Free</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </Link>
                  <Link
                    href="/ats-checker"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    <span>Check ATS Compatibility</span>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  {/* Authenticated User Profile Summary Card */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs shrink-0">
                        {(profile?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {profile?.full_name || user.user_metadata?.full_name || 'My Profile'}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                      Sync Active
                    </span>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await signOut();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50/70 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200/60 dark:border-red-900/40 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
