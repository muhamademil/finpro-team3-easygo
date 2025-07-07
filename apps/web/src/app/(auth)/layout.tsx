import AuthLayout from '@/components/Layouts/AuthLayout';

export default function AuthLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
