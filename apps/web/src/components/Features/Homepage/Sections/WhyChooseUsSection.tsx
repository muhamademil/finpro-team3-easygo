import Image from 'next/image';
import { features } from '@/constants/whyChooseUs';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-10 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-80 lg:h-full flex justify-center">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750789405/WhyChooseUsIllustration_z0pqyr.png" // Ganti dengan path ilustrasi Anda
              alt="Ilustrasi kenapa pilih EasyGo"
              width={450}
              height={450}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 font-fat">
              Kenapa Pilih Kami
            </h2>
            <p className="mt-2 text-gray-600">
              Kamu butuh jutaan satu alasan buat sama dia, kami cuma butuh 4
              alasan kok buat kamu pilih.
            </p>

            <div className="mt-8 space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
