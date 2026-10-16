'use client';

import React from 'react';

export const BuilderSkeleton: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f1f5f9] flex flex-col font-sans animate-pulse">
      {/* 1. Header / Navbar Skeleton */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-200" />
          <div className="h-8 w-44 rounded-md bg-slate-200 hidden sm:block" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="h-8 w-28 rounded-lg bg-slate-200 hidden md:block" />
          <div className="h-8 w-24 rounded-lg bg-slate-200 hidden md:block" />
          <div className="h-8 w-20 rounded-lg bg-slate-200" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-slate-200 hidden sm:block" />
          <div className="h-8 w-24 rounded-lg bg-slate-200" />
          <div className="h-8 w-28 rounded-lg bg-blue-200" />
        </div>
      </header>

      {/* 2. Main Content Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Form Area Skeleton */}
        <div className="flex-1 flex flex-col h-full bg-slate-50/50 lg:border-r border-slate-200">
          {/* Section Navigation Tabs Skeleton */}
          <div className="border-b border-slate-200 px-6 py-2.5 bg-white flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              {[64, 88, 76, 56, 72, 52].map((w, idx) => (
                <div key={idx} className="h-8 rounded-xl bg-slate-200" style={{ width: `${w}px` }} />
              ))}
            </div>
            <div className="w-24 h-4 rounded-full bg-slate-200 hidden md:block" />
          </div>

          {/* Form Body Skeleton */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-12 py-8 space-y-8">
            <div className="space-y-2">
              <div className="h-6 w-48 rounded-md bg-slate-300" />
              <div className="h-4 w-72 rounded-md bg-slate-200" />
            </div>

            {/* Simulated Avatar / Header Upload */}
            <div className="flex items-center gap-5 p-4 rounded-2xl border border-slate-200 bg-white">
              <div className="w-16 h-16 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-36 rounded-md bg-slate-300" />
                <div className="h-3 w-48 rounded-md bg-slate-200" />
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-slate-200" />
                <div className="h-10 rounded-lg bg-slate-200" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-slate-200" />
                <div className="h-10 rounded-lg bg-slate-200" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-slate-200" />
                <div className="h-10 rounded-lg bg-slate-200" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-slate-200" />
                <div className="h-10 rounded-lg bg-slate-200" />
              </div>
            </div>

            {/* Textarea skeleton */}
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-slate-200" />
              <div className="h-28 rounded-xl bg-slate-200" />
            </div>
          </div>

          {/* Bottom Nav Skeleton */}
          <div className="border-t border-slate-200 bg-white px-6 sm:px-10 lg:px-12 py-3.5 flex items-center justify-between shrink-0">
            <div className="h-9 w-24 rounded-lg bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200 hidden sm:block" />
            <div className="h-9 w-32 rounded-lg bg-slate-200" />
          </div>
        </div>

        {/* Right Live A4 Canvas Skeleton */}
        <div className="flex-1 bg-[#e2e8f0]/60 overflow-y-auto hidden lg:flex items-start justify-center p-8">
          <div className="w-[520px] h-[735px] bg-white rounded-lg shadow-xl p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div className="space-y-2.5">
                <div className="h-6 w-44 rounded bg-slate-200" />
                <div className="h-3.5 w-32 rounded bg-slate-200" />
              </div>
              <div className="w-14 h-14 rounded-full bg-slate-200" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-5/6 rounded bg-slate-200" />
              <div className="h-3 w-4/6 rounded bg-slate-200" />
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-4 w-28 rounded bg-slate-300" />
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-11/12 rounded bg-slate-200" />
              <div className="h-3 w-3/4 rounded bg-slate-200" />
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-4 w-28 rounded bg-slate-300" />
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-5/6 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
