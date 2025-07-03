'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/Elements/Button';
import { ChevronDownIcon } from 'lucide-react';
import { useAuthStore, User } from '@/stores/useAuth.store';
import { useRouter } from 'next/navigation';

export const Navbar = ({ user }: { user?: User | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); // Call action logout from store
    router.push('/login');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={
              isScrolled
                ? 'https://res.cloudinary.com/dohpngcuj/image/upload/v1750169793/LogoBlack_roqf28.png'
                : 'https://res.cloudinary.com/dohpngcuj/image/upload/v1749717672/easylogo_oloc1b.png'
            }
            alt="EasyGo Logo"
            width={100}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Right Content */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/register">
                <Button variant="outlined" className="bg-white">
                  Daftar
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="solid">Masuk</Button>
              </Link>
            </>
          ) : (
            <>
              {user.is_verified ? (
                <span className="text-sm text-gray-700">
                  Hi, {user.name || 'User'}
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Belum Terverifikasi
                </span>
              )}

              <Popover className="relative">
                <PopoverButton className="flex items-center space-x-2">
                  <Image
                    src={user.photo_url || 'https://i.pravatar.cc/150'}
                    alt={user.name || 'profile'}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                  <ChevronDownIcon className="w-4 h-4 text-gray-700" />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md p-2 space-y-1"
                >
                  <Link
                    href="/profile"
                    className="block text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/my-book"
                    className="block text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
                  >
                    My Book
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-red-500 hover:bg-gray-100 rounded px-2 py-1"
                  >
                    Logout
                  </button>
                </PopoverPanel>
              </Popover>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
