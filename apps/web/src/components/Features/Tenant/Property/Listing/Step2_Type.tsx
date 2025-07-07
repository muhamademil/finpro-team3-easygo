'use client';
import Image from 'next/image';
import { useListingStore } from '@/stores/useListing.store';

const propertyTypes = [
  {
    name: 'VILLA',
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1751267188/IconVilla_-_Edited_lzqmrs.png',
  },
  {
    name: 'APARTMENT',
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1751267188/IconApart_-_Edited_qdcthc.png',
  },
  {
    name: 'GUEST_HOUSE',
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1751267188/IconHouse_-_Edited_evxtyb.png',
  },
] as const;

export const Step2_Type = () => {
  const { listingData, setPropertyType, errors } = useListingStore();
  const selectedType = listingData.propertyType;

  return (
    <div className="w-full max-w-lg text-center">
      <h1 className="text-3xl font-semibold font-fat mb-2">
        Pilih Tipe Tempatmu
      </h1>
      <p className="text-gray-600 mb-8">
        Biar tamu tahu mereka bakal nginep di mana, pilih kategori yang paling
        cocok buat properti kamu.
      </p>
      {errors.propertyType && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
          {errors.propertyType}
        </div>
      )}
      <div className="space-y-4">
        {propertyTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => setPropertyType(type.name)}
            className={`w-full border-2 rounded-xl p-4 flex items-center justify-between text-left transition-all ${
              selectedType === type.name
                ? 'border-blue-600 bg-blue-50'
                : errors.propertyType
                  ? 'border-red-300'
                  : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className="text-xl font-semibold font-fat text-gray-800">
              {type.name}
            </span>
            <Image src={type.image} alt={type.name} width={100} height={100} />
          </button>
        ))}
      </div>
    </div>
  );
};
