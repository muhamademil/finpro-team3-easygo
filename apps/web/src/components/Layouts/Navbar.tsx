'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/Elements/Button';
import { ChevronDownIcon } from 'lucide-react';
import { useAuthStore, User } from '@/stores/useAuth.store';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = ({ user }: { user?: User | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 NEW STATE
  const { logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        setIsScrolled(window.scrollY > 10);
      }
    };

    if (isHome) {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }

    return () => {
      if (isHome) window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
  }`;

  const handleNavigate = async (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    logout();
    router.push('/');
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[999]">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        </div>
      )}
      <nav className={navClass}>
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src={
                isScrolled || !isHome
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

                  <PopoverPanel className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md p-2 space-y-1 z-50">
                    <button
                      onClick={() => handleNavigate('/profile')}
                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() =>
                        handleNavigate('/dashboard/booking/my-booking')
                      }
                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
                    >
                      My Book
                    </button>
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
      {!isHome && <div className="h-[64px]" />}
    </>
  );
};
