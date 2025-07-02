// app/dashboard/layout.tsx

import { DashboardHeader } from '@/components/Features/Tenant/Header/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ambil data user di sini jika diperlukan untuk di-pass ke Header
  const user = {
    name: 'Narendra House',
    photoUrl: 'https://i.pravatar.cc/150?u=naren',
    verified: true,
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader user={user} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
