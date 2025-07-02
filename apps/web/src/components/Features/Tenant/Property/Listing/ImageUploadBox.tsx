'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';

type ImageUploadBoxProps = {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  initialFile?: File | null;
};

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  onFileSelect,
  onFileRemove,
  initialFile,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialFile) {
      setPreview(URL.createObjectURL(initialFile));
    } else {
      setPreview(null);
    }
  }, [initialFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (onFileRemove) onFileRemove();
  };

  return (
    <div className="relative w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {preview ? (
        <>
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
          {onFileRemove && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 z-10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </>
      ) : (
        <div className="text-center">
          <UploadCloud className="mx-auto h-8 w-8" />
          <p className="mt-2 text-sm">Click to upload</p>
        </div>
      )}
    </div>
  );
};
