import { TenantPropertyCard } from '@/components/Features/Tenant/Property/TenantPropertyCard';
import Button from '@/components/Elements/Button';
import Link from 'next/link';
import { getMyPropertiesAPI } from '@/services/tenant.service';

export default async function TenantPropertyPage() {
  const tenantProperties = await getMyPropertiesAPI();
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
          <Link href="/new/1" legacyBehavior>
            <a>
              <Button variant="solid">Buat Listing Pertama</Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
