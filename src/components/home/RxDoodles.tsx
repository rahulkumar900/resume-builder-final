'use client';

import React from 'react';

// 1. Sharpened Pencil with spiral shavings (Hero section)
export function PencilDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg width="140" height="150" viewBox="0 0 140 150" fill="none" className="drop-shadow-md">
        {/* Pencil Shavings spiral */}
        <path
          d="M75 105 C85 95, 105 95, 115 110 C125 125, 110 140, 95 138 C80 135, 70 120, 80 110 Z"
          fill="#E7DFD5"
          stroke="#C5BDB2"
          strokeWidth="1.5"
        />
        <path
          d="M90 115 C95 110, 105 112, 108 120 C110 128, 100 132, 94 130"
          stroke="#9C6644"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Pencil Body (Octagonal angled yellow/graphite) */}
        <g transform="rotate(-38 50 60)">
          {/* Eraser and ferrule */}
          <rect x="20" y="8" width="16" height="18" rx="3" fill="#E07A5F" />
          <rect x="20" y="24" width="16" height="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5" />
          <line x1="20" y1="28" x2="36" y2="28" stroke="#64748B" strokeWidth="0.8" />
          <line x1="20" y1="31" x2="36" y2="31" stroke="#64748B" strokeWidth="0.8" />
          {/* Yellow body facets */}
          <rect x="20" y="34" width="6" height="75" fill="#EAB308" />
          <rect x="26" y="34" width="4" height="75" fill="#FACC15" />
          <rect x="30" y="34" width="6" height="75" fill="#CA8A04" />
          {/* Sharpened wood cone */}
          <polygon points="20,109 36,109 28,135" fill="#F5EBE0" stroke="#E6CCB2" strokeWidth="0.5" />
          {/* Graphite lead tip */}
          <polygon points="26,126 30,126 28,135" fill="#1E293B" />
        </g>
      </svg>
    </div>
  );
}

// 2. Metallic Paperclip (Hero / Remember section)
export function PaperclipDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="60" height="75" viewBox="0 0 60 75" fill="none" className="drop-shadow-sm rotate-12">
        <path
          d="M18 60 L18 20 C18 10, 32 10, 32 20 L32 52 C32 58, 25 58, 25 52 L25 24 C25 20, 29 20, 29 24 L29 50"
          stroke="#94A3B8"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 60 L18 20 C18 10, 32 10, 32 20 L32 52 C32 58, 25 58, 25 52 L25 24 C25 20, 29 20, 29 24 L29 50"
          stroke="#CBD5E1"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// 3. Rectangular Rubber Eraser with paper sleeve (Write section)
export function EraserDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="120" height="65" viewBox="0 0 120 65" fill="none" className="drop-shadow-md -rotate-6">
        {/* Rubber body top & bottom */}
        <rect x="10" y="15" width="100" height="34" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
        {/* Angled bevel highlight */}
        <polygon points="10,15 25,10 115,10 110,15" fill="#FFFFFF" opacity="0.8" />
        {/* Paper sleeve wrapping */}
        <rect x="45" y="14" width="45" height="36" fill="#1E293B" rx="1.5" />
        <rect x="48" y="17" width="39" height="30" fill="#0F172A" />
        {/* Brand label typography on sleeve */}
        <text x="67" y="34" fill="#F8FAFC" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
          STUDIO
        </text>
        <text x="67" y="42" fill="#94A3B8" fontSize="5" fontFamily="sans-serif" textAnchor="middle">
          NON-DUST · 2B
        </text>
      </svg>
    </div>
  );
}

// 4. French Curve / Drafting Protractor Ruler (Design section)
export function RulerDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="130" height="130" viewBox="0 0 130 130" fill="none" className="drop-shadow-md rotate-12">
        {/* Transparent acrylic plastic body with subtle green tint */}
        <path
          d="M20 110 C20 50, 60 20, 110 20 C100 45, 95 70, 105 95 C85 90, 65 95, 50 110 Z"
          fill="rgba(240, 253, 244, 0.75)"
          stroke="#86EFAC"
          strokeWidth="1.8"
        />
        {/* Inner cutout shape */}
        <path
          d="M45 85 C45 60, 65 45, 88 45 C82 58, 80 72, 85 82 C75 80, 65 82, 58 88 Z"
          fill="#FFFFFF"
          stroke="#BBF7D0"
          strokeWidth="1.2"
        />
        {/* Millimeter measurement tick marks */}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((deg, i) => (
          <line
            key={i}
            x1={30 + i * 8}
            y1={110 - i * 3}
            x2={30 + i * 8}
            y2={104 - i * 3}
            stroke="#16A34A"
            strokeWidth="1"
            opacity="0.8"
          />
        ))}
      </svg>
    </div>
  );
}

// 5. Magnifying Glass (Check section)
export function MagnifyingGlassDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" className="drop-shadow-lg -rotate-12">
        {/* Glass lens circle with gloss reflection */}
        <circle cx="45" cy="45" r="32" fill="rgba(240, 253, 244, 0.4)" stroke="#334155" strokeWidth="4" />
        <circle cx="45" cy="45" r="30" stroke="#94A3B8" strokeWidth="1" />
        {/* Lens reflection glare arc */}
        <path d="M26 35 A24 24 0 0 1 50 21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        {/* Metallic handle */}
        <rect x="70" y="70" width="10" height="34" rx="3" transform="rotate(-45 70 70)" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
        {/* Chrome ferrule collar */}
        <rect x="65" y="65" width="8" height="8" rx="1" transform="rotate(-45 65 65)" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

// 6. Tailor Scissors with Spool of Green Thread (Tailor section)
export function TailorScissorsDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="150" height="120" viewBox="0 0 150 120" fill="none" className="drop-shadow-md">
        {/* Thread Spool */}
        <g transform="translate(95, 45) rotate(15)">
          <rect x="0" y="5" width="30" height="38" rx="2" fill="#15803D" />
          {/* Thread coils */}
          <line x1="0" y1="12" x2="30" y2="12" stroke="#166534" strokeWidth="1" />
          <line x1="0" y1="18" x2="30" y2="18" stroke="#166534" strokeWidth="1" />
          <line x1="0" y1="24" x2="30" y2="24" stroke="#166534" strokeWidth="1" />
          <line x1="0" y1="30" x2="30" y2="30" stroke="#166534" strokeWidth="1" />
          <line x1="0" y1="36" x2="30" y2="36" stroke="#166534" strokeWidth="1" />
          {/* Wooden wooden rims */}
          <rect x="-3" y="0" width="36" height="5" rx="1.5" fill="#D4A373" stroke="#BC6C25" strokeWidth="0.8" />
          <rect x="-3" y="43" width="36" height="5" rx="1.5" fill="#D4A373" stroke="#BC6C25" strokeWidth="0.8" />
          {/* Trailing loose thread */}
          <path d="M15 48 C10 65, 30 75, 45 60 C55 50, 70 70, 90 65" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>
        {/* Scissors */}
        <g transform="translate(10, 15) rotate(-15)">
          {/* Blade 1 */}
          <path d="M40 35 L95 18 C98 17, 100 20, 96 22 L45 42 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
          {/* Blade 2 */}
          <path d="M40 45 L95 62 C98 63, 100 60, 96 58 L45 38 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          {/* Screw Pivot */}
          <circle cx="43" cy="40" r="3.5" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
          {/* Handles */}
          <path d="M40 35 C35 25, 20 18, 12 28 C4 38, 18 50, 30 42 Z" stroke="#334155" strokeWidth="3.5" fill="none" />
          <path d="M40 45 C35 55, 20 62, 12 52 C4 42, 18 30, 30 38 Z" stroke="#334155" strokeWidth="3.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}

// 7. Origami Paper Airplane (Share section)
export function PaperAirplaneDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="110" height="90" viewBox="0 0 110 90" fill="none" className="drop-shadow-lg -rotate-12">
        {/* Dashed flight loop trail */}
        <path
          d="M5 80 C20 70, 25 45, 10 35 C-5 25, 5 10, 25 15 C45 20, 60 40, 75 35"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
        />
        {/* Plane folds */}
        <g transform="translate(60, 15) rotate(25)">
          <polygon points="40,20 0,0 12,20" fill="#FFFFFF" />
          <polygon points="40,20 0,0 8,24" fill="#E2E8F0" />
          <polygon points="40,20 12,20 8,24" fill="#94A3B8" />
          <polygon points="40,20 0,40 12,20" fill="#F8FAFC" />
        </g>
      </svg>
    </div>
  );
}

// 8. Analog Clock Face (Prepare section)
export function ClockDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
        {/* Outer clock ring */}
        <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />
        {/* Soft emerald sector slice (9:30 AM interview countdown) */}
        <path d="M50 50 L50 14 A36 36 0 0 1 82 68 Z" fill="rgba(34, 197, 94, 0.12)" />
        {/* Hour marks */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2={i % 3 === 0 ? "15" : "12"}
            stroke={i % 3 === 0 ? "#1E293B" : "#94A3B8"}
            strokeWidth={i % 3 === 0 ? "2" : "1"}
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
        {/* Hour hand pointing to ~9:30 */}
        <line x1="50" y1="50" x2="26" y2="40" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        {/* Minute hand pointing to 6 (30 min) */}
        <line x1="50" y1="50" x2="50" y2="80" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" />
        {/* Center pin */}
        <circle cx="50" cy="50" r="3.5" fill="#0F172A" />
      </svg>
    </div>
  );
}

// 9. Glass Savings Coin Jar (FAQ section)
export function CoinJarDoodle({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`}>
      <svg width="100" height="120" viewBox="0 0 100 120" fill="none" className="drop-shadow-md">
        {/* Glass jar rim & lid */}
        <ellipse cx="50" cy="22" rx="28" ry="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
        <rect x="26" y="16" width="48" height="6" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
        {/* Glass jar body */}
        <path
          d="M22 28 C22 28, 14 36, 14 55 C14 95, 18 108, 50 108 C82 108, 86 95, 86 55 C86 36, 78 28, 78 28 Z"
          fill="rgba(241, 245, 249, 0.45)"
          stroke="#94A3B8"
          strokeWidth="2.5"
        />
        {/* Gold coins stacked inside */}
        <ellipse cx="42" cy="95" rx="14" ry="5" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="56" cy="92" rx="13" ry="4.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="46" cy="85" rx="14" ry="5" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="52" cy="78" rx="13" ry="4.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.2" />
        <ellipse cx="38" cy="80" rx="12" ry="4.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.2" />
        {/* Glass glare arc */}
        <path d="M22 45 C20 65, 22 90, 32 100" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}
