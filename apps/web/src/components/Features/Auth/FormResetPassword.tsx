'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../../Elements/Button';
import InputForm from '../../Elements/Input';
import { resetPasswordAPI } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

export const FormResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await resetPasswordAPI({ token, newPassword });
      alert('Reset Password Berhasil! Anda akan diarahkan ke halaman login.');
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Error');
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
          Ganti Password
        </h1>
        <p className="text-slate-500 text-sm">
          Buat Password yang kuat dan mudah kamu ingat ya, biar ga lupa terus.
        </p>
      </div>

      <form onSubmit={handleResetPassword}>
        <InputForm
          label="New Password"
          id="newpassword"
          type="password"
          placeholder="Password baru kamu"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant="solid"
          className="w-full mt-4 font-fat font-medium"
        >
          {' '}
          {isLoading ? 'Memproses Email...' : 'Reset Password'}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default FormResetPassword;
