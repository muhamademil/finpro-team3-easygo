import AuthLayout from '@/components/Layouts/AuthLayouts';
export default function AuthLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
