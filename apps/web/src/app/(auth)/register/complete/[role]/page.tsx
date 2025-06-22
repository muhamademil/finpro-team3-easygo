import { notFound } from 'next/navigation';
import CompleteRegisterForm from '@/components/Features/Auth/FormCompleteRegister';

type PageProps = {
  params: {
    role: string;
  };
};

const RegisterCompletePage = async ({ params }: PageProps) => {
  const role = await Promise.resolve(params.role);

  // Validasi role
  const upperRole = role.toUpperCase();
  if (upperRole !== 'TENANT' && upperRole !== 'TRAVELLER') {
    return notFound();
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-cover bg-center bg-[url('/images/bg-register.jpg')]">
      <CompleteRegisterForm role={upperRole as 'TENANT' | 'TRAVELLER'} />
    </main>
  );
};

export default RegisterCompletePage;
