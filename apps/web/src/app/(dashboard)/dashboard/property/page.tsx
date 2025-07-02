// app/(dashboard)/dashboard/property/page.tsx

import { TenantPropertyCard } from '@/components/Features/Tenant/Property/TenantPropertyCard';
import Button from '@/components/Elements/Button';
import Link from 'next/link';
import type { Property } from '@/lib/type';

// Data properti dummy milik tenant ini.
// Nantinya, data ini akan diambil dari database (fetch API).
const tenantProperties: Property[] = [
  {
    id: 1,
    name: 'Home in Sukajadi',
    location: 'Bandung, Indonesia',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400',
    rating: 4.98,
    reviews: 72,
    price: 350000,
    category: 'House',
  },
  {
    id: 4,
    name: 'Villa Tepi Tebing',
    location: 'Bandung, Indonesia',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400',
    rating: 4.99,
    reviews: 112,
    price: 650000,
    category: 'Villa',
  },
  // Tambahkan properti lainnya milik tenant
];

export default function TenantPropertyPage() {
  return (
    <div>
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Properti Kamu</h1>
        <Link href="/new/1">
          <Button variant="solid">Buat Listing</Button>
        </Link>
      </div>

      {/* Grid untuk menampilkan daftar properti */}
      {tenantProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tenantProperties.map((property) => (
            <TenantPropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        // Tampilan jika tenant belum memiliki properti
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            Anda belum memiliki properti.
          </h2>
          <p className="text-gray-500 mt-2 mb-6">
            Ayo mulai daftarkan properti pertama Anda!
          </p>
          <Link href="/new" legacyBehavior>
            <a>
              <Button variant="solid">Buat Listing Pertama</Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
