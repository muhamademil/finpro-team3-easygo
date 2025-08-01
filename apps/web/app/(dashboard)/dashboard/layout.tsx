import { redirect } from 'next/navigation';
import { getServerSideSession } from '@/lib/session';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSideSession();

  if (!session || session.role !== 'TENANT') {
    redirect('/login');
  }

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
