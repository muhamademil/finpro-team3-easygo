'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Elements/Button';
import InputForm from '@/components/Elements/Input';
import { SOCIAL_LOGINS } from '@/constants/auth';

type UserRole = 'traveller' | 'tenant';

export const FormRegister = () => {
  // State untuk form fields
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State untuk melacak tab yang aktif
  const [activeTab, setActiveTab] = useState<UserRole>('traveller');

  // Handler untuk form submission
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      nama,
      email,
      password,
      role: activeTab,
    };
    console.log('Mendaftarkan data:', formData);
    // Di sini Anda akan menambahkan logika untuk call API
  };

  // Class untuk styling tab agar tidak berulang
  const baseTabClass = 'inline-block w-full p-4 border-b-2 rounded-t-lg';
  const activeTabClass = 'text-primary-blue border-primary-blue';
  const inactiveTabClass = 'border-transparent hover:text-gray-600';

  return (
    <div className="w-full sm:w-[448px] bg-white/20 backdrop-blur-xl rounded-xl p-6 md:p-8">
      <div className="relative mx-auto mb-4 w-28 sm:w-32 md:w-[107px] aspect-[107/24]">
        <Image
          src="https://res.cloudinary.com/dohpngcuj/image/upload/v1749717672/easylogo_oloc1b.png"
          alt="easygo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="w-full text-center mb-6">
        <h1 className="text-xl md:text-2xl text-slate-900 font-fat font-semibold">
          Buat Akun Baru
        </h1>
        <p className="text-slate-500 text-sm">
          Daftar Sekarang, Liburan Jadi Gampang!
        </p>
      </div>

      {/* TAB */}
      <div className="text-center text-gray-500">
        <ul className="flex -mb-px">
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab('traveller')}
              className={`${baseTabClass} ${activeTab === 'traveller' ? activeTabClass : inactiveTabClass}`}
            >
              <span className="text-lg font-semibold">Traveller</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab('tenant')}
              className={`${baseTabClass} ${activeTab === 'tenant' ? activeTabClass : inactiveTabClass}`}
            >
              <span className="text-lg font-semibold">Tenant</span>
            </button>
          </li>
        </ul>
      </div>

      <form onSubmit={handleRegister}>
        <InputForm
          label="Email"
          id="Email"
          type="text"
          placeholder="Masukan email kamu"
          value={email}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <p className="text-xs text-slate-500 italic mt-2">
          *Kami akan mengirimkan verifikasi ke email kamu
        </p>
        <Button
          type="submit"
          variant="solid"
          className="w-full mt-6 font-fat font-medium"
        >
          Daftar sebagai {activeTab === 'traveller' ? 'Traveller' : 'Tenant'}
        </Button>
      </form>

      <div className="text-center mt-4 text-sm text-slate-600">
        Sudah punya akun?{' '}
        <Link
          href="/login"
          className="font-medium text-primary-blue hover:underline"
        >
          Masuk di sini
        </Link>
      </div>
      <div className="my-4 border-t border-dashed border-gray-300"></div>

      <div className="flex flex-row gap-2">
        {SOCIAL_LOGINS.map((social) => (
          <Button
            key={social.alt}
            className="w-full bg-white hover:bg-gray-100 cursor-pointer"
          >
            <Image
              src={social.src}
              alt={social.alt}
              width={social.width}
              height={social.height}
              className="mx-auto"
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FormRegister;
