'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Elements/Button';
import InputForm from '@/components/Elements/Input';
import { SOCIAL_LOGINS } from '@/constants/auth';
import Image from 'next/image';
import { initiateRegistrationAPI } from '@/services/auth.service';
import axios from 'axios';
import { googleLoginAPI } from '@/services/auth.service';
import { useAuthStore, User } from '@/stores/useAuth.store';
import { useRouter } from 'next/navigation';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';

type UserRole = 'TRAVELLER' | 'TENANT';
const FormRegister = () => {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  // State form fields
  const [email, setEmail] = useState('');

  const [activeTab, setActiveTab] = useState<UserRole>('TRAVELLER');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGoogleSuccess = async (
    tokenResponse: Omit<
      TokenResponse,
      'error' | 'error_description' | 'error_uri'
    >,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await googleLoginAPI(tokenResponse.access_token);
      const { token, user }: { token: string; user: User } = response.data.data;

      setToken(token);
      setUser(user);

      alert('Login dengan Google berhasil!');
      if (user.role === 'TENANT') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Gagal login dengan Google.');
      } else {
        setError('Terjadi kesalahan yang tidak terduga.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Login dengan Google gagal. Silakan coba lagi.');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  // Handler form submission
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await initiateRegistrationAPI({
        email,
        role: activeTab,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Email atau password salah.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const baseTabClass = 'inline-block w-full p-4 border-b-2 rounded-t-lg';
  const activeTabClass = 'text-primary-blue border-primary-blue';
  const inactiveTabClass =
    'text-gray-600 border-transparent hover:text-gray-600 hover:border-gray-300';

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
          Daftar Sekarang. Liburan jadi Gampang!
        </p>
      </div>

      <div className="text-sm font-medium text-center">
        <ul className="flex -mb-px">
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab('TRAVELLER')}
              className={`${baseTabClass} ${activeTab === 'TRAVELLER' ? activeTabClass : inactiveTabClass}`}
            >
              <span className="text-lg font-semibold">Traveller</span>
            </button>
          </li>
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setActiveTab('TENANT')}
              className={`${baseTabClass} ${activeTab === 'TENANT' ? activeTabClass : inactiveTabClass}`}
            >
              <span className="text-lg font-semibold"> Tenant</span>
            </button>
          </li>
        </ul>
      </div>

      <form onSubmit={handleRegister}>
        <InputForm
          label="Email"
          id="email"
          type="email"
          placeholder="Masukan email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="text-slate-500 italic text-xs mt-2">
          *Kami akan mengirimkan verifikasi registrasi ke email kamu
        </p>

        <Button
          disabled={isLoading}
          type="submit"
          variant="solid"
          className="w-full mt-6 font-fat font-medium"
        >
          {isLoading
            ? 'Memproses...'
            : `Daftar sebagai ${activeTab === 'TRAVELLER' ? 'TRAVELLER' : 'TENANT'}`}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
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

      <div className="flex sm:flex-row gap-2">
        {SOCIAL_LOGINS.map((social) => (
          <Button
            key={social.alt}
            onClick={() => googleLogin()}
            className="w-full sm:flex-1 bg-white hover:bg-gray-100 cursor-pointer"
            disabled={isLoading}
          >
            <div className="flex items-center justify-center">
              <Image
                src={social.src}
                alt={social.alt}
                width={social.width}
                height={social.height}
              />
              <span className="text-gray-700 ml-3">
                {isLoading ? 'Memproses...' : `Login dengan ${social.alt}`}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FormRegister;
