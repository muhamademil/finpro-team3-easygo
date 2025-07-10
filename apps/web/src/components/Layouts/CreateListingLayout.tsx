'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useListingStore } from '@/src/stores/useListing.store';
import Button from '../Elements/Button';

const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = 4;
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full transition-all w-full ${
            index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export const CreateListingLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const {
    currentStep,
    validateAndGoToNextStep,
    prevStep,
    submitListing,
    isLoading,
  } = useListingStore();

  const handleNext = async () => {
    const isValid = validateAndGoToNextStep();
    if (isValid) {
      if (currentStep < 4) {
        router.push(`/new/${currentStep + 1}`);
      } else {
        const isValid = validateAndGoToNextStep(); // Pastikan validasi terakhir dijalankan
        if (isValid) {
          try {
            await submitListing();
            alert('Properti berhasil dibuat!');
            router.push(`/dashboard/property`);
          } catch (error) {
            console.error('Gagal membuat properti:', error);
            alert(
              'Terjadi kesalahan saat membuat properti. Silakan periksa kembali data Anda dan coba lagi.',
            );
          }
        }
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      prevStep();
      router.push(`/new/${currentStep - 1}`);
    } else {
      router.push('/dashboard/property');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Image
            src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750169793/LogoBlack_roqf28.png"
            alt="EasyGo Logo"
            width={100}
            height={40}
          />
        </div>
      </header>

      <div className="container mx-auto px-4 pt-8">
        <ProgressBar currentStep={currentStep} />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        {children}
      </main>

      <footer className="border-t sticky bottom-0 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="outlined" onClick={handlePrev}>
            {currentStep === 1 ? 'Cancel' : 'Prev'}
          </Button>
          <Button variant="solid" onClick={handleNext}>
            {currentStep === 4
              ? isLoading
                ? 'Publishing...'
                : 'Publish'
              : 'Next'}
          </Button>
        </div>
      </footer>
    </div>
  );
};
