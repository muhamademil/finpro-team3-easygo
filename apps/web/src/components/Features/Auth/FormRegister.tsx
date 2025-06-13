'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Elements/Button';
import InputForm from '@/components/Elements/Input';

// Tipe data untuk peran agar konsisten
type UserRole = 'traveller' | 'tenant';
const FormRegister = () => {
  // State untuk form fields
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 1. State untuk melacak tab yang aktif
  const [activeTab, setActiveTab] = useState<UserRole>('traveller');

  // 2. Handler untuk form submission
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      nama,
      email,
      password,
      role: activeTab, // <-- Menyertakan peran yang dipilih
    };
    console.log('Mendaftarkan data:', formData);
    // Di sini Anda akan menambahkan logika untuk call API
  };

  // 3. Class untuk styling tab agar tidak berulang
  const baseTabClass = 'inline-block w-full p-4 border-b-2 rounded-t-lg';
  const activeTabClass = 'text-primary-blue border-primary-blue';
  const inactiveTabClass =
    'border-transparent hover:text-gray-600 hover:border-gray-300';

  return (
    <div className="w-full sm:w-[448px] bg-white/20 backdrop-blur-xl rounded-xl p-6 md:p-8">
      <div className="w-full text-center mb-6">
        <h1 className="text-xl md:text-2xl text-slate-900 font-fat font-semibold">
          Buat Akun Baru
        </h1>
        <p className="text-slate-500 text-sm">
          Pilih peranmu dan mulai petualanganmu!
        </p>
      </div>

      {/* === BAGIAN TAB DIMULAI DI SINI === */}
      <div className="text-sm font-medium text-cente border-b border-gray-200 mb-4">
        <ul className="flex -mb-px">
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab('traveller')}
              className={`${baseTabClass} ${activeTab === 'traveller' ? activeTabClass : inactiveTabClass}`}
            >
              Traveller
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab('tenant')}
              className={`${baseTabClass} ${activeTab === 'tenant' ? activeTabClass : inactiveTabClass}`}
            >
              Tenant
            </button>
          </li>
        </ul>
      </div>
      {/* === BAGIAN TAB SELESAI === */}

      <form onSubmit={handleRegister}>
        {/* Di sini Anda bisa menambahkan input yang berbeda berdasarkan 'activeTab' jika perlu */}
        <InputForm
          label="Nama Lengkap"
          id="nama"
          type="text"
          placeholder="Nama kamu"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <InputForm
          label="Email"
          id="email"
          type="email"
          placeholder="Email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputForm
          label="Password"
          id="password"
          type="password"
          placeholder="Password kamu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="solid"
          className="w-full mt-6 font-fat font-medium "
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
    </div>
  );
};

export default FormRegister;
