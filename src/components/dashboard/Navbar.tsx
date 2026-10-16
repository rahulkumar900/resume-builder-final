'use client';

import React from 'react';
import { RxNavbar } from '@/components/home/RxNavbar';

interface NavbarProps {
  onOpenScore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return <RxNavbar />;
};

export default Navbar;
