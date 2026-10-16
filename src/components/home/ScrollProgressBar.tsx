'use client';

import React, { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-slate-100/50"
    >
      <div
        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 origin-left transition-all duration-75 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
