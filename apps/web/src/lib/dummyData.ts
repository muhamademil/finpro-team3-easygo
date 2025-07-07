// // lib/dummyData.ts

// import type { Property } from '@/types/type'; // Asumsi tipe ini ada di lib/type.ts

// // Kita juga definisikan master fasilitas di sini untuk konsistensi
// export const masterFacilities = [
//   { id: 'fac-1', name: 'Kitchen' },
//   { id: 'fac-2', name: 'Free parking on premises' },
//   { id: 'fac-3', name: '43 inch TV with Netflix' },
//   { id: 'fac-4', name: 'WiFi' },
//   { id: 'fac-5', name: 'Pool' },
//   { id: 'fac-6', name: 'Air conditioning' },
//   { id: 'fac-7', name: 'Exterior security cameras' },
//   { id: 'fac-8', name: 'Gym' },
//   { id: 'fac-9', name: 'Water heater' },
//   { id: 'fac-10', name: 'Hair dryer' },
// ];

// // Data dummy untuk satu properti yang akan diedit
// export const dummyPropertyData: Partial<Property> = {
//   category: 'Villa',
//   name: 'Villa Asri Puncak dengan Pemandangan Gunung',
//   description:
//     'Nikmati ketenangan dan udara sejuk di villa kami yang luas. Dilengkapi dengan kolam renang pribadi dan pemandangan langsung ke Gunung Gede Pangrango. Sempurna untuk liburan keluarga atau acara bersama teman.',
//   address: 'Jl. Raya Puncak - Cianjur No.54',
//   city: 'Bogor',
//   latitude: -6.7118,
//   longitude: 107.0425,

//   // Untuk foto, kita gunakan URL string karena data ini datang dari server
//   // Komponen ImageUploadBox perlu sedikit disesuaikan untuk menerima URL
//   images: [
//     {
//       id: 1,
//       image_url:
//         'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800',
//     },
//     {
//       id: 2,
//       image_url:
//         'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
//     },
//     {
//       id: 3,
//       image_url:
//         'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800',
//     },
//     {
//       id: 4,
//       image_url:
//         'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800',
//     },
//     {
//       id: 5,
//       image_url:
//         'https://images.unsplash.com/photo-1617806118233-5cf6e7a23aa5?q=80&w=800',
//     },
//   ],

//   // Data kamar yang sudah ada
//   rooms: [
//     {
//       id: 'room-uuid-1',
//       title: 'Kamar Tidur Utama (King Bed)',
//       maxGuests: 2,
//       price: 1500000,
//       photo: null,
//     },
//     {
//       id: 'room-uuid-2',
//       title: 'Kamar Anak (Twin Bed)',
//       maxGuests: 2,
//       price: 850000,
//       photo: null,
//     },
//   ],

//   // Daftar ID fasilitas yang sudah dipilih untuk properti ini
//   facilities: ['fac-1', 'fac-4', 'fac-5', 'fac-6', 'fac-9'],
// };
