import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { aboutLinks } from '@/constants/footer';
import { tenantLinks } from '@/constants/footer';
import { paymentLogos } from '@/constants/footer';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750169793/LogoBlack_roqf28.png"
              alt="EasyGo Logo"
              width={120}
              height={40}
            />
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>
                Jl. Jend Sudirman Kav. 54, Lt 41, Central Jakarta, 12789
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span>Hours: 8:00 - 17:00, Mon - Sat</span>
            </div>
          </div>

          <div className="text-sm">
            <h3 className="font-bold text-gray-800 mb-4">Tentang EasyGo</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <h3 className="font-bold text-gray-800 mb-4">Tenants</h3>
            <ul className="space-y-3">
              {tenantLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4">Cari Kami</h3>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Facebook className="w-5 h-5 text-gray-700" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Instagram className="w-5 h-5 text-gray-700" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Twitter className="w-5 h-5 text-gray-700" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Youtube className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border rounded-2xl mt-12 grid grid-cols-1 md:grid-cols-3">
          <div className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750791315/CSIcon_efq9ko.png"
              alt="Pusat Bantuan"
              width={80}
              height={80}
            />
            <div>
              <p className="text-sm text-gray-600">Pusat Bantuan</p>
              <p className="text-lg font-bold text-gray-800">+62 811 688 888</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 border-b md:border-b-0 md:border-r">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750791315/EmailIcon_biuzhm.png"
              alt="Email Kami"
              width={80}
              height={80}
            />
            <div>
              <p className="text-sm text-gray-600">Email Kami</p>
              <p className="text-lg font-bold text-gray-800">cs@easygo.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750791279/WhatsappIcon_dw2epe.png"
              alt="WhatsApp Kami"
              width={80}
              height={80}
            />
            <div>
              <p className="text-sm text-gray-600">WhatsApp Kami</p>
              <p className="text-lg font-bold text-gray-800">+62 851 555 232</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-bold text-gray-800 mb-4">Payment Supports</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-4 items-center">
            {paymentLogos.map((logo, index) => (
              <div
                key={index}
                className="flex justify-center items-center p-2 bg-gray-50 rounded-md h-12"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={60}
                  height={20}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-500">
            Copyright © 2025 EasyGo. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
