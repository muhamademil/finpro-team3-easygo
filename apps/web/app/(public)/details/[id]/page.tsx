import { getPropertyByIdAPI } from '@/services/property.service';
import { redirect } from 'next/navigation';
import { PropertyDetailClient } from '../PropertyDetailClient';

export const dynamic = 'force-dynamic';

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const propertyId = params.id;

  const propertyData = await getPropertyByIdAPI(propertyId);

  if (!propertyData) {
    return redirect('/not-found');
  }

  return <PropertyDetailClient property={propertyData} />;
}
