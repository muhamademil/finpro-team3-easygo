import Image from 'next/image';

const infoItems = [
  {
    title: '1 Ceritain Soal Propertimu',
    description:
      'Masukin info dasar kayak lokasi dan kapasitas tamu. Gak perlu ribet!',
    icon: 'https://res.cloudinary.com/dohpngcuj/image/upload/v1751266195/ListingIcon3_ocgbqi.png',
  },
  {
    title: '2 Bikin Makin Menarik',
    description:
      'Upload minimal 5 foto kece, kasih judul dan deskripsi. Tenang, kita bantu kalau bingung.',
    icon: 'https://res.cloudinary.com/dohpngcuj/image/upload/v1751266192/ListingIcon_avhpn4.png',
  },
  {
    title: '3 Terbitkan dan Siap Disewa!',
    description:
      'Tentukan harga awal, lengkapi detail penting, terus langsung publish deh. Mudah kan?',
    icon: 'https://res.cloudinary.com/dohpngcuj/image/upload/v1751266196/ListingIcon2_cjfma4.png',
  },
];

export const Step1_Welcome = () => {
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-semibold font-fat">
          Mulai di EasyGo Gampang Banget!
        </h1>
      </div>
      <div className="space-y-8">
        {infoItems.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <Image src={item.icon} alt={item.title} width={64} height={64} />
            <div>
              <h3 className="font-fat font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
