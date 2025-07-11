import CompleteRegisterForm from '@/components/Features/Auth/FormCompleteRegister';
import { notFound } from 'next/navigation';

export default async function RegisterCompletePage({
  params,
}: {
  params: { role: string };
}) {
  const upperRole = params.role.toUpperCase();

  if (upperRole !== 'TRAVELLER' && upperRole !== 'TENANT') {
    notFound();
  }

  return <CompleteRegisterForm role={upperRole as 'TRAVELLER' | 'TENANT'} />;
}
