'use client';

import React, { useState } from 'react';
import {
  Palette,
  Sun,
  Moon,
  Laptop,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import {
  useTheme,
  THEME_PRESETS,
  THEME_RADII,
  ThemePreset,
  ThemeMode,
  ThemeRadius,
} from '@/context/ThemeContext';

interface ThemePresetSwitcherProps {
  variant?: 'floating' | 'button' | 'compact';
  className?: string;
}

export const ThemePresetSwitcher: React.FC<ThemePresetSwitcherProps> = ({
  variant = 'floating',
  className = '',
}) => {
  const { preset, setPreset, mode, setMode, radius, setRadius } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    setPreset('blue');
    setMode('light');
    setRadius('0.75rem');
  };

  return (
    <>
      {/* Trigger Button */}
      {variant === 'floating' && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-card text-card-foreground border border-border rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:border-primary/50"
            title="Customize Shadcn Theme Preset"
            aria-label="Customize Theme"
          >
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
              <Palette className="w-3 h-3" />
            </div>
            <span className="text-xs font-semibold hidden sm:inline-block">Theme</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>
        </div>
      )}

      {variant === 'button' && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer ${className}`}
          title="Customize Theme"
        >
          <Palette className="w-3.5 h-3.5 text-primary" />
          <span>Theme</span>
        </button>
      )}

      {variant === 'compact' && (
        <button
          onClick={() => setIsOpen(true)}
          className={`p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer ${className}`}
          title="Customize Theme"
          aria-label="Customize Theme"
        >
          <Palette className="w-4 h-4 text-primary" />
        </button>
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md bg-card text-card-foreground rounded-2xl border border-border shadow-2xl p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">Theme Customizer</h3>
                  <p className="text-[11px] text-muted-foreground">Pick a shadcn theme preset for all pages</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Theme Color Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Color Preset</span>
                <span className="text-[11px] text-muted-foreground capitalize">{preset}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {THEME_PRESETS.map((p) => {
                  const isSelected = preset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPreset(p.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/20 bg-accent text-accent-foreground shadow-xs'
                          : 'border-border hover:border-primary/40 bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center shadow-2xs"
                        style={{ backgroundColor: p.color }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </span>
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Radius Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Corner Radius</span>
                <span className="text-[11px] text-muted-foreground">{radius}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {THEME_RADII.map((r) => {
                  const isSelected = radius === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRadius(r.id)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/20 bg-accent text-accent-foreground shadow-xs'
                          : 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Mode Toggle (Light / Dark / System) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Mode</span>
                <span className="text-[11px] text-muted-foreground capitalize">{mode}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'light' as ThemeMode, label: 'Light', icon: Sun },
                  { id: 'dark' as ThemeMode, label: 'Dark', icon: Moon },
                  { id: 'system' as ThemeMode, label: 'System', icon: Laptop },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary ring-2 ring-primary/20 bg-accent text-accent-foreground shadow-xs'
                          : 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
