'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../../Elements/Button';
import InputForm from '../../Elements/Input';
import { forgotPasswordAPI } from '@/services/auth.service';
import { useAuthStore } from '@/stores/useAuth.store';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const FormForgotPassword = () => {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await forgotPasswordAPI({ email });
      const { token } = response.data.data;

      setToken(token);

      alert(
        'Kalau email kamu benar. seharusnya kami sudah mengirim link reset password',
      );
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Email salah.');
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
          Lupa Password?
        </h1>
        <p className="text-slate-500 text-sm">
          Tenang, semua orang pernah lupa. Masukkan email kamu, nanti kami kirim
          link buat reset password-nya.
        </p>
      </div>

      <form onSubmit={handleLogin}>
        <InputForm
          label="Email"
          id="email"
          type="email"
          placeholder="Masukan email kamu yang terdaftar"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default FormForgotPassword;
