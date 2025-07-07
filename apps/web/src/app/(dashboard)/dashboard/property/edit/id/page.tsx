// // app/(dashboard)/dashboard/property/edit/[id]/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useListingStore } from '@/stores/useListing.store';
// import Button from '@/components/Elements/Button';

// // Impor semua komponen seksi yang baru kita buat
// import { EditPropertyType } from '@/components/Features/Tenant/Property/Edit/EditPropertyType';
// import { EditPropertyInfo } from '@/components/Features/Tenant/Property/Edit/EditPropertyInfo';
// import { EditMainPhotos } from '@/components/Features/Tenant/Property/Edit/EditMainPhotos';
// import { EditRooms } from '@/components/Features/Tenant/Property/Edit/EditRooms';
// import { EditFacilities } from '@/components/Features/Tenant/Property/Edit/EditFacilities';

// // Asumsi data dummy
// import { dummyPropertyData } from '@/lib/dummyData';

// export default function EditListingPage() {
//   const params = useParams();
//   const propertyId = params.id as string;

//   // Ambil action 'initializeForm' dari store
//   const { initializeForm, listingData } = useListingStore();
//   const [isLoading, setIsLoading] = useState(true);

//   // Ambil data dan inisialisasi form
//   useEffect(() => {
//     // Di sini Anda akan fetch ke API
//     const fetchedData = dummyPropertyData;
//     initializeForm(fetchedData);
//     setIsLoading(false);
//   }, [propertyId, initializeForm]);

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Saving changes:', listingData);
//     alert('Perubahan berhasil disimpan!');
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-8">Loading property data...</div>
//     );
//   }

//   return (
//     <form onSubmit={handleFormSubmit}>
//       {/* Header Halaman */}
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Edit Properti</h1>
//       </div>

//       {/* Kontainer Utama untuk Semua Seksi Form */}
//       <div className="max-w-4xl mx-auto space-y-12 pb-24">
//         {/* Rakit semua komponen di sini */}
//         <EditPropertyType />
//         <EditPropertyInfo />
//         <EditMainPhotos />
//         <EditRooms />
//         <EditFacilities />
//       </div>

//       {/* Tombol Simpan 'Sticky' di Bawah */}
//       <div className="fixed bottom-0 left-0 w-full bg-white border-t z-20">
//         <div className="container mx-auto px-4 py-4 flex justify-end">
//           <Button type="submit">Simpan Perubahan</Button>
//         </div>
//       </div>
//     </form>
//   );
// }
