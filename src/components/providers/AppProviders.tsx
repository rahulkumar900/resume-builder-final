'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { ThemeProvider } from '@/context/ThemeContext';
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <AuthModal />
      </AuthProvider>
    </ThemeProvider>
  );
};
