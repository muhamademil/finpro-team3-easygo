'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../Elements/Button';
import InputForm from '../../Elements/Input';
import { SOCIAL_LOGINS } from '@/constants/auth';
import { loginAPI } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const FormLogin = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginAPI({ email, password });
      const { token } = response.data.data;

      setToken(token);

      alert('Login Berhasil! Anda akan diarahkan ke halaman utama');
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Email atau password salah.');
      } else {
        setError('Terjadi kesalahan yang tidak terduga. Silakan coba lagi.');
        console.error('An unexpected error occurred:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          Masuk ke akun kamu
        </h1>
        <p className="text-slate-500 text-sm">
          Biar kamu bisa langsung cari tempat nginep yang pas!
        </p>
      </div>

      <form onSubmit={handleLogin}>
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
        <div className="text-slate-500 hover:text-primary-blue text-sm text-end my-2">
          <Link href="/lupa-password">Lupa Password?</Link>
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          variant="solid"
          className="w-full mt-4 font-fat font-medium"
        >
          {' '}
          {isLoading ? 'Memproses...' : 'Masuk'}
          Masuk
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Link href="/register" className="block w-full">
          <Button
            type="button"
            variant="outlined"
            className="w-full mt-4 font-fat font-medium"
          >
            Daftar
          </Button>
        </Link>
      </form>

      <div className="my-4 border-t border-dashed border-gray-300"></div>

      <div className="flex flex-col sm:flex-row gap-2">
        {SOCIAL_LOGINS.map((social) => (
          <Button
            key={social.alt}
            className="w-full sm:flex-1 bg-white hover:bg-gray-100 cursor-pointer"
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

export default FormLogin;
