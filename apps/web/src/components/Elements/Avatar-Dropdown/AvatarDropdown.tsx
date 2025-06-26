'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  name: string;
  imageUrl: string;
};

export const AvatarDropdown = ({ name, imageUrl }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <Image
          src={imageUrl}
          alt={name}
          width={36}
          height={36}
          className="rounded-full border border-gray-300"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden z-10">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link
            href="/my-book"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Book
          </Link>
          <button
            onClick={() => console.log('logout')}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
