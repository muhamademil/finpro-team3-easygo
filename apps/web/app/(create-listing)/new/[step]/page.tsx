'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useListingStore } from '@/stores/useListing.store';
import { Step1_Welcome } from '@/components/Features/Tenant/Property/Listing/Step1_Welcome';
import { Step2_Type } from '@/components/Features/Tenant/Property/Listing/Step2_Type';
import { Step3_Info } from '@/components/Features/Tenant/Property/Listing/Step3_Info';
import { Step4_Details } from '@/components/Features/Tenant/Property/Listing/Step4_Details';

export default function CreateListingPage() {
  const params = useParams();
  const step = Number(params.step);
  const { goToStep } = useListingStore();

  useEffect(() => {
    if (step) {
      goToStep(step);
    }
  }, [step, goToStep]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_Welcome />;
      case 2:
        return <Step2_Type />;
      case 3:
        return <Step3_Info />;
      case 4:
        return <Step4_Details />;
      default:
        return <div>Langkah tidak ditemukan.</div>;
    }
  };

  return renderStep();
}
