import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { MainNavbar } from '@/components/Layouts/MainNavbar';
import { Footer } from '@/components/Layouts/Footer';

const satoshi = localFont({
  src: [
    {
      path: 'fonts/Satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi/Satoshi-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/Satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi/Satoshi-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'fonts/Satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi/Satoshi-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'fonts/Satoshi/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'fonts/Satoshi/Satoshi-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

const clashGrotesk = localFont({
  src: [
    {
      path: 'fonts/ClashGrotesk/ClashGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/ClashGrotesk/ClashGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/ClashGrotesk/ClashGrotesk-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/ClashGrotesk/ClashGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-clash-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EasyGo - Booking Mudah',
  description: 'Easy Booking. Easy Living. Easy Travelling.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    console.error('Google Client ID tidak ditemukan di environment variables.');
    return (
      <html lang="en">
        <body>
          <div>Error: Konfigurasi Google Login tidak ditemukan.</div>
        </body>
      </html>
    );
  }
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${clashGrotesk.variable} font-sans`}
    >
      <body>
        <GoogleOAuthProvider clientId={googleClientId}>
          <MainNavbar />
          <main>{children}</main>
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
