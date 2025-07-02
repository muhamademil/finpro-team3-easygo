// components/layout/DashboardHeader.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, AlertCircle, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { Fragment } from 'react';
// Data Navigasi
const navLinks = [
  { href: '/dashboard', label: 'Beranda' },
  { href: '/dashboard/property', label: 'Property' },
  { href: '/dashboard/season', label: 'Season' },
  { href: '/dashboard/sales', label: 'Penjualan' },
  { href: '/dashboard/booking', label: 'Booking' },
  { href: '/dashboard/reviews', label: 'Ulasan' },
];

// Tipe data untuk user, mirip seperti di Navbar publik
type User = {
  name: string;
  photoUrl: string;
  verified: boolean;
};

export const DashboardHeader = ({
  user,
}: {
  user?: { name: string; photoUrl: string; verified: boolean };
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // User dummy untuk development
  const currentUser: User = user || {
    name: 'Narendra House',
    photoUrl: 'https://i.pravatar.cc/150?u=narendra',
    verified: false, // <-- Ganti jadi `true` untuk menghilangkan notifikasi
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard">
          <Image
            src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750169793/LogoBlack_roqf28.png"
            alt="EasyGo Logo"
            width={100}
            height={40}
          />
        </Link>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Konten Kanan: Notifikasi & User */}
        <div className="flex items-center gap-4">
          {!currentUser.verified && (
            <div className="hidden sm:flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <AlertCircle className="w-4 h-4" />
              <span>Belum Terverifikasi</span>
            </div>
          )}
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-2 rounded-full focus:outline-none">
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                Hi, {currentUser.name}
              </span>
              <Image
                src={currentUser.photoUrl}
                alt={currentUser.name}
                width={36}
                height={36}
                className="rounded-full"
              />
              <ChevronDown className="hidden sm:block w-4 h-4 text-gray-500" />
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg focus:outline-none p-1">
                <div className="py-1">
                  <Link
                    href="/dashboard/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => alert('Logout action!')}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-gray-700 hover:bg-gray-50 rounded-md px-3 py-2 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
