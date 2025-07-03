'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuth.store';
import { Navbar } from './Navbar';
import { DashboardHeader } from './DashboardHeader';

const HIDDEN_NAVBAR_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/register/complete',
  '/new',
];

export const MainNavbar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isHidden = HIDDEN_NAVBAR_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  if (isHidden) {
    return null;
  }

  if (user && user.role === 'TENANT') {
    return <DashboardHeader user={user} />;
  }

  return <Navbar user={user} />;
};
