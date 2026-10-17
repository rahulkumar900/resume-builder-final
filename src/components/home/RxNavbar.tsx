'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserMenu } from '@/components/auth/UserMenu';
import { useTheme } from '@/context/ThemeContext';

export const PAGE_NAV_LINKS = [
  { href: '/templates', label: 'Templates' },
  { href: '/ats-checker', label: 'ATS Checker' },
  { href: '/examples', label: 'Examples' },
  { href: '/create', label: 'AI Builder' },
  { href: '/blog', label: 'Guides' },
];

export function RxNavbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { mode, setMode, resolvedMode } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Brand Monogram & Name */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white font-serif font-bold text-lg shadow-xs group-hover:bg-emerald-800 transition-colors">
                R
              </span>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                  Resume<span className="text-emerald-700 dark:text-emerald-400">Builder</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.16em] font-mono text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
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
          <div className="flex items-center gap-3">
            {/* Direct Link to ATS Scanner */}
            <Link
              href="/ats-checker"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>ATS Score Test</span>
            </Link>

            {/* Primary Action Button */}
            {!user ? (
              <Link
                href="/create"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Build Resume Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="text-xs font-semibold px-4 py-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  Dashboard
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
              className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:border-emerald-500 dark:hover:border-emerald-400 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-2xs group"
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
              className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with page links */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-black/[0.08] dark:border-white/[0.08] px-4 pt-2 pb-6 space-y-2">
            {PAGE_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
              <Link
                href="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 rounded-full text-xs font-semibold text-white bg-emerald-700"
              >
                Build Resume Free
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
