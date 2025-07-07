// 'use client';

// import { useState } from 'react';
// import { PropertyCard } from '../../Shared/PropertyCard';
// import { Property } from '@/types/type';
// import Image from 'next/image';
// import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// const allFlashSaleItems: Property[] = [
//   {
//     id: 1,
//     name: 'Villa Mewah di Dago',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400',
//     rating: 4.98,
//     reviews: 72,
//     price: 350000,
//     category: 'Villa',
//   },
//   {
//     id: 2,
//     name: 'Apartemen Pusat Kota',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=400',
//     rating: 4.8,
//     reviews: 55,
//     price: 250000,
//     category: 'Apartment',
//   },
//   {
//     id: 3,
//     name: 'Rumah Keluarga Asri',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1570129477492-45c003edd2e0?q=80&w=400',
//     rating: 4.91,
//     reviews: 85,
//     price: 450000,
//     category: 'House',
//   },
//   {
//     id: 4,
//     name: 'Villa Tepi Tebing',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400',
//     rating: 4.99,
//     reviews: 112,
//     price: 650000,
//     category: 'Villa',
//   },
//   {
//     id: 5,
//     name: 'Studio Apartment Modern',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=400',
//     rating: 4.75,
//     reviews: 40,
//     price: 200000,
//     category: 'Apartment',
//   },
//   {
//     id: 6,
//     name: 'Villa Kolam Pribadi',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400',
//     rating: 4.96,
//     reviews: 95,
//     price: 550000,
//     category: 'Villa',
//   },
//   {
//     id: 7,
//     name: 'Rumah Minimalis',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=400',
//     rating: 4.88,
//     reviews: 60,
//     price: 300000,
//     category: 'House',
//   },
//   {
//     id: 8,
//     name: 'Villa Kolam Pribadi',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400',
//     rating: 4.96,
//     reviews: 95,
//     price: 550000,
//     category: 'Villa',
//   },
//   {
//     id: 9,
//     name: 'Villa Kolam Pribadi',
//     location: 'Bandung, Indonesia',
//     image:
//       'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400',
//     rating: 4.96,
//     reviews: 95,
//     price: 550000,
//     category: 'Villa',
//   },
// ];

// const TABS = ['Villa', 'Apartment', 'House'];

// export const FlashSaleSection: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('Villa');

//   const filteredItems = allFlashSaleItems.filter(
//     (item) => item.category === activeTab,
//   );

//   return (
//     <section className="py-16">
//       <div className="container mx-auto px-4 sm:px-10">
//         <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 p-8 md:p-12">
//           <div className="flex items-center gap-4 mb-6">
//             <Image
//               src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750755901/flashsaleIcon_lx46ls.png"
//               alt="Flash Sale Icon"
//               width={48}
//               height={48}
//             />
//             <div>
//               <h2 className="text-3xl font-semibold text-gray-900 font-fat">
//                 Flash Sale!
//               </h2>
//               <p className="text-gray-600 text-sm mt-1">
//                 Lagi rame banget nih! Properti kece harga miring, buruan sebelum
//                 kehabisan!
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 mb-8">
//             {TABS.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   activeTab === tab
//                     ? 'bg-blue-600 text-white shadow'
//                     : 'bg-white text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <ScrollArea className="w-full">
//             <div className="flex gap-6 pb-4">
//               {filteredItems.map((property) => (
//                 <PropertyCard key={property.id} property={property} />
//               ))}
//             </div>
//             <ScrollBar orientation="horizontal" />
//           </ScrollArea>
//         </div>
//       </div>
//     </section>
//   );
// };
