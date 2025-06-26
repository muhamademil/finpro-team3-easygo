'use client';

import { useState } from 'react';
import Image from 'next/image';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    alert(
      `Terima kasih! Email ${email} telah didaftarkan untuk menerima newsletter kami.`,
    );
    setEmail('');
  };

  return (
    <section className="relative w-full h-[40vh] flex items-center justify-center">
      <Image
        src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750790353/FB511574-67B2-42AF-9632-D6B1FA296672_1_201_a_uebg2n.jpg" // Ganti dengan path gambar Anda
        alt="Pemandangan alam untuk latar belakang newsletter"
        fill
        className="object-cover"
        quality={80}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center text-white px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-medium font-fat">
          Stay updated with travel tips, recommendations and latest promos.
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="flex items-center bg-white rounded-lg p-2 shadow-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan alamat email Anda"
              required
              className="w-full bg-transparent text-gray-700 placeholder-gray-400 text-sm px-4 py-2 border-none focus:ring-0"
            />
            <button
              type="submit"
              className="bg-primary-blue text-white font-semibold text-sm px-6 py-2 rounded-md flex-shrink-0 hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
