'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="w-full mb-6">
        <div className="grid grid-cols-4 gap-2 h-96 mb-4">
          {/* Main Image */}
          <div
            className="col-span-2 row-span-2 cursor-pointer relative overflow-hidden rounded-lg"
            onClick={() => openLightbox(selectedImage)}
          >
            <Image
              src={images[selectedImage] || '/placeholder.svg'}
              alt="Property main image"
              fill
              className="object-cover hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Thumbnail Images */}
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="cursor-pointer relative overflow-hidden rounded-lg"
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`Property image ${index + 2}`}
                fill
                className="object-cover hover:opacity-80 transition-opacity"
                onClick={() => {
                  setSelectedImage(index + 1);
                  openLightbox(index + 1);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setShowLightbox(false)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 z-10 text-white hover:bg-white/20"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Main Image */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <Image
                src={images[lightboxIndex] || '/placeholder.svg'}
                alt={`Property image ${lightboxIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 z-10 text-white hover:bg-white/20"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 cursor-pointer border-2 rounded ${
                    index === lightboxIndex
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={`Thumbnail ${index + 1}`}
                    width={60}
                    height={40}
                    className="w-15 h-10 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
