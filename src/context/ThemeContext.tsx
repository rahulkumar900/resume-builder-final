'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemePreset = 'blue' | 'zinc' | 'violet' | 'emerald' | 'rose' | 'orange';
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeRadius = '0.3rem' | '0.5rem' | '0.75rem' | '1.0rem';

export interface ThemeConfig {
  preset: ThemePreset;
  mode: ThemeMode;
  radius: ThemeRadius;
}

interface ThemeContextType {
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  radius: ThemeRadius;
  setRadius: (radius: ThemeRadius) => void;
  resolvedMode: 'light' | 'dark';
}

export const THEME_PRESETS: Array<{
  id: ThemePreset;
  name: string;
  color: string;
  darkColor: string;
}> = [
  { id: 'blue', name: 'Blue', color: '#2563eb', darkColor: '#3b82f6' },
  { id: 'zinc', name: 'Zinc', color: '#18181b', darkColor: '#fafafa' },
  { id: 'violet', name: 'Violet', color: '#7c3aed', darkColor: '#8b5cf6' },
  { id: 'emerald', name: 'Emerald', color: '#059669', darkColor: '#10b981' },
  { id: 'rose', name: 'Rose', color: '#e11d48', darkColor: '#f43f5e' },
  { id: 'orange', name: 'Orange', color: '#ea580c', darkColor: '#f97316' },
];

export const THEME_RADII: Array<{ id: ThemeRadius; label: string }> = [
  { id: '0.3rem', label: '0.3' },
  { id: '0.5rem', label: '0.5' },
  { id: '0.75rem', label: '0.75' },
  { id: '1.0rem', label: '1.0' },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preset, setPresetState] = useState<ThemePreset>('emerald');
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [radius, setRadiusState] = useState<ThemeRadius>('0.75rem');
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const savedPreset = localStorage.getItem('shadcn-theme-preset') as ThemePreset;
      if (savedPreset && THEME_PRESETS.some((p) => p.id === savedPreset)) {
        setPresetState(savedPreset);
      } else {
        setPresetState('emerald');
      }

      const savedMode = (localStorage.getItem('theme') || localStorage.getItem('shadcn-theme-mode')) as ThemeMode;
      if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
        setModeState(savedMode);
      }

      const savedRadius = localStorage.getItem('shadcn-theme-radius') as ThemeRadius;
      if (savedRadius && THEME_RADII.some((r) => r.id === savedRadius)) {
        setRadiusState(savedRadius);
      }
    } catch (e) {
      // LocalStorage access restricted or unavailable
    }
  }, []);

  // Update DOM attributes whenever configuration changes
  useEffect(() => {
    const root = document.documentElement;

    // Apply Theme Preset
    root.setAttribute('data-theme', preset);

    // Apply Radius
    root.style.setProperty('--radius', radius);

    // Calculate resolved mode
    let effectiveMode: 'light' | 'dark' = 'light';
    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveMode = systemDark ? 'dark' : 'light';
    } else {
      effectiveMode = mode;
    }

    setResolvedMode(effectiveMode);

    if (effectiveMode === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [preset, mode, radius]);

  const setPreset = (newPreset: ThemePreset) => {
    setPresetState(newPreset);
    try {
      localStorage.setItem('shadcn-theme-preset', newPreset);
    } catch (e) {}
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem('shadcn-theme-mode', newMode);
      localStorage.setItem('theme', newMode);
    } catch (e) {}
  };

  const setRadius = (newRadius: ThemeRadius) => {
    setRadiusState(newRadius);
    try {
      localStorage.setItem('shadcn-theme-radius', newRadius);
    } catch (e) {}
  };

  return (
    <ThemeContext.Provider
      value={{
        preset,
        setPreset,
        mode,
        setMode,
        radius,
        setRadius,
        resolvedMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
