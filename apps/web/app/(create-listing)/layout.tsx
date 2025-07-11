// app/(dashboard)/dashboard/property/new/[step]/layout.tsx
import { CreateListingLayout } from '@/components/Layouts/CreateListingLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Layout ini hanya membungkus anak-anaknya dengan layout wizard
  return <CreateListingLayout>{children}</CreateListingLayout>;
}
