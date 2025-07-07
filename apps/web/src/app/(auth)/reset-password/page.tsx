import { Suspense } from 'react';
import FormResetPassword from '@/components/Features/Auth/FormResetPassword';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormResetPassword />
    </Suspense>
  );
}
