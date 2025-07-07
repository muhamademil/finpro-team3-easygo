'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import Button from '../../Elements/Button';
import InputForm from '../../Elements/Input';
import { completeRegistrationAPI } from '@/services/auth.service';
import { CloudUpload, User } from 'lucide-react';
import { getUploadSignatureAPI } from '@/services/upload.service';
import { CompleteRegistrationInput } from '@/models/user.model';
import { Loader2 } from 'lucide-react';

type Props = {
  role: 'TRAVELLER' | 'TENANT';
};

export const CompleteRegisterForm = ({ role }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State traveller
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState('');

  // State untuk TENANT
  const [city, setCity] = useState('');
  const [bank_account, setBankAccount] = useState('');
  const [bank_account_name, setBankAccountName] = useState('');

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError(
        'Token tidak ditemukan. Silakan cek kembali link dari email Anda.',
      );
    }
  }, [searchParams]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setError(null);

    try {
      // 1. Minta "izin" (signature) dari backend kita
      const { data: signatureData } = await getUploadSignatureAPI();

      // 2. Siapkan data untuk dikirim ke Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append('signature', signatureData.data.signature);
      formData.append('timestamp', signatureData.data.timestamp);

      // 3. Upload langsung ke API Cloudinary
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
        formData,
      );

      // 4. Simpan URL yang dikembalikan oleh Cloudinary ke state
      setPhotoUrl(cloudinaryResponse.data.secure_url);
    } catch (err) {
      console.error('Gagal mengupload foto:', err);
      setError('Gagal mengupload foto. Silakan coba lagi.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleCompleteRegistration = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload: CompleteRegistrationInput = {
      token,
      name,
      password,
      phone,
      photo_url: photoUrl,
      ...(role === 'TENANT' && { city, bank_account, bank_account_name }),
    };

    try {
      await completeRegistrationAPI(payload);
      alert(
        'Pendaftaran berhasil diselesaikan! Akun Anda kini aktif sepenuhnya.',
      );
      router.push(role === 'TENANT' ? '/dashboard' : '/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || 'Terjadi kesalahan pada server.',
        );
      } else {
        setError('Terjadi kesalahan yang tidak terduga. Silakan coba lagi.');
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
          Satu Langkah Lagi
        </h1>
        <p className="text-slate-500 text-sm">
          Isi data dulu ya, biar properti kamu bisa disewain!
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="w-24 h-24 bg-white rounded-full overflow-hidden flex items-center justify-center">
          {isUploadingPhoto ? (
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          ) : photoUrl ? (
            <Image
              src={photoUrl}
              alt="Uploaded Photo"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <User size={40} className="text-gray-500" />
          )}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
          />
          <Button
            type="button"
            onClick={triggerFileSelect}
            variant="white"
            className="flex items-center gap-2 py-2 px-4 bg-white text-slate-800"
            disabled={isUploadingPhoto}
          >
            <CloudUpload size={16} />
            {isUploadingPhoto ? 'Uploading...' : 'Pilih Foto'}
          </Button>
          <p className="text-xs text-gray-500 mt-2">PNG, JPEG, maks 1Mb</p>
        </div>
      </div>

      <form onSubmit={handleCompleteRegistration}>
        <InputForm
          label="Name"
          id="name"
          type="text"
          placeholder="Nama lengkap kamu, dong!"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputForm
          label="Password"
          id="password"
          type="password"
          placeholder="Bikin password yang aman ya 🔒"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputForm
          label="Phone"
          id="phone"
          type="text"
          placeholder="Nomor HP aktif, biar bisa dihubungi"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {role === 'TENANT' && (
          <>
            <InputForm
              label="City"
              id="city"
              type="text"
              placeholder="Domisili kamu sekarang di mana?"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <InputForm
                label="No Rekening"
                id="bank_account"
                type="text"
                placeholder="Norek kamu, jangan typo ya"
                value={bank_account}
                onChange={(e) => setBankAccount(e.target.value)}
                required
              />
              <InputForm
                label="Nama Rekening"
                id="bank_account_name"
                type="text"
                placeholder="Nama di rekening bank"
                value={bank_account_name}
                onChange={(e) => setBankAccountName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <Button
          disabled={isLoading}
          type="submit"
          variant="solid"
          className="w-full mt-4 font-fat font-medium"
        >
          {isLoading ? 'Memproses Verifikasi...' : 'Verifikasi Data'}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      <div className="my-4 border-t border-dashed border-gray-300"></div>
    </div>
  );
};

export default CompleteRegisterForm;
