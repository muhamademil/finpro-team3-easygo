import { getMyPropertiesAPI } from '@/services/tenant.service';
import SeasonClientPage from './SeasonClientPage';

// Ini adalah Server Component, jadi aman untuk memanggil fungsi server.
export default async function SeasonPage() {
  // 1. Data fetching terjadi di sini, di sisi server.
  const myProperties = await getMyPropertiesAPI();

  // 2. Data yang sudah jadi diberikan ke komponen klien sebagai props.
  return <SeasonClientPage initialProperties={myProperties} />;
}
