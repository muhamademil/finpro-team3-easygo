import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Impor services API dari frontend
import { getUploadSignatureAPI } from '@/services/upload.service';
import { createPropertyAPI } from '@/services/property.service';
import { getFacilitiesAPI } from '@/services/facilities.service';

import { CreatePropertyInput, Property } from '@/types/type';

export type Facility = {
  id: string;
  name: string;
};

export type RoomData = {
  id: string; // ID unik untuk mapping di React
  title: string;
  maxGuests: number;
  price: number;
  photo: File | null;
};

type ListingData = {
  propertyType: 'VILLA' | 'APARTMENT' | 'GUEST_HOUSE' | null;
  title: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  mainPhotos: File[];
  rooms: RoomData[];
  facilities: string[];
};

type FormErrors = Partial<
  Record<keyof ListingData | 'rooms' | 'mainPhotos' | 'general', string>
>;

type SubmitResult = {
  message: string;
  data: Property;
};

// Tipe untuk state dan actions di store kita
type ListingState = {
  currentStep: number;
  listingData: ListingData;
  setPropertyType: (type: ListingData['propertyType']) => void;
  // Menggunakan Generics untuk membuat setField menjadi type-safe
  setField: <K extends keyof ListingData>(
    field: K,
    value: ListingData[K],
  ) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  addMainPhoto: (file: File) => void;
  removeMainPhoto: (index: number) => void;
  addRoom: () => void;
  updateRoomField: <K extends keyof RoomData>(
    roomId: string,
    field: K,
    value: RoomData[K],
  ) => void;
  setRoomPhoto: (roomId: string, file: File | null) => void;
  removeRoom: (roomId: string) => void;
  toggleFacility: (facility: string) => void;
  errors: FormErrors; // <-- STATE BARU UNTUK ERRORS
  validateAndGoToNextStep: () => boolean; // <-- ACTION NEXTSTEP YANG BARU
  clearErrors: () => void;
  submitListing: () => Promise<SubmitResult>;
  isLoading: boolean;

  masterFacilities: Facility[];
  fetchFacilities: () => Promise<void>;
};

const defaultCoords = { lat: -6.9175, lng: 107.6191 };

const initialListingData: ListingData = {
  propertyType: null,
  title: '',
  description: '',
  address: '',
  city: 'Bandung',
  latitude: defaultCoords.lat,
  longitude: defaultCoords.lng,
  mainPhotos: [],
  rooms: [{ id: uuidv4(), title: '', maxGuests: 2, price: 0, photo: null }],
  facilities: [],
};

export const useListingStore = create<ListingState>((set, get) => ({
  currentStep: 1,
  errors: {},
  isLoading: false,
  masterFacilities: [],
  listingData: initialListingData,

  fetchFacilities: async () => {
    try {
      const response = await getFacilitiesAPI();
      set({ masterFacilities: response.data.data });
    } catch (error) {
      console.error('Gagal mengambil data fasilitas:', error);
      // Anda bisa menambahkan penanganan error di sini jika perlu
    }
  },

  submitListing: async () => {
    set({ isLoading: true, errors: {} });
    const { listingData } = get();

    try {
      // --- Langkah 1: Dapatkan "izin" upload dari backend ---
      const { data } = await getUploadSignatureAPI();
      const signatureData = data.data;

      // --- Langkah 2: Siapkan semua file untuk di-upload ---
      const allFilesToUpload = [
        ...listingData.mainPhotos,
        ...listingData.rooms
          .map((room) => room.photo)
          .filter((file): file is File => file !== null),
      ];

      const uploadPromises = allFilesToUpload.map((file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append('signature', signatureData.signature);
        formData.append('timestamp', signatureData.timestamp);

        console.log({
          file,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          signature: signatureData.signature,
          timestamp: signatureData.timestamp,
        });

        return axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
          formData,
        );
      });

      // --- Langkah 3: Upload semua gambar secara paralel ---
      const uploadResults = await Promise.all(uploadPromises);
      const uploadedUrls = uploadResults.map(
        (res) => res.data.secure_url as string,
      );

      // Pisahkan URL untuk main photos dan room photos
      const mainImageUrls = uploadedUrls.slice(
        0,
        listingData.mainPhotos.length,
      );
      const roomImageUrls = uploadedUrls.slice(listingData.mainPhotos.length);

      // --- Langkah 4: Siapkan payload final untuk API backend ---
      const finalPayload: CreatePropertyInput = {
        name: listingData.title,
        description: listingData.description,
        address: listingData.address,
        city: listingData.city,
        latitude: listingData.latitude,
        longitude: listingData.longitude,
        category: listingData.propertyType!,
        imageUrls: mainImageUrls,
        facilityIds: listingData.facilities,
        rooms: listingData.rooms.map((room) => ({
          name: room.title,
          base_price: room.price,
          max_guest: room.maxGuests,
          imageUrl: room.photo ? roomImageUrls.shift() : undefined,
        })),
      };

      // --- Langkah 5: Kirim data final ke API backend ---
      const response = await createPropertyAPI(finalPayload);
      console.log(response);

      set({ isLoading: false });
      return response.data; // Kembalikan data properti yang baru dibuat
    } catch (error) {
      console.error('Error submitting listing:', error);
      set({
        isLoading: false,
        errors: {
          general:
            'Terjadi kesalahan saat membuat properti. Silakan coba lagi.',
        },
      });
      throw error;
    }
  },

  clearErrors: () => set({ errors: {} }),

  toggleFacility: (facilityId: string) =>
    set((state) => {
      const currentFacilities = state.listingData.facilities;
      const newFacilities = currentFacilities.includes(facilityId)
        ? currentFacilities.filter((id) => id !== facilityId)
        : [...currentFacilities, facilityId];
      return {
        listingData: { ...state.listingData, facilities: newFacilities },
      };
    }),

  validateAndGoToNextStep: () => {
    const { currentStep, listingData } = get();
    const newErrors: FormErrors = {};
    let isValid = true;

    // --- LOGIKA VALIDASI PER LANGKAH ---

    if (currentStep === 2) {
      if (!listingData.propertyType) {
        newErrors.propertyType = 'Tipe properti harus dipilih.';
        isValid = false;
      }
    }

    if (currentStep === 3) {
      if (!listingData.title.trim()) {
        newErrors.title = 'Judul properti tidak boleh kosong.';
        isValid = false;
      }
      if (!listingData.description.trim()) {
        newErrors.description = 'Deskripsi tidak boleh kosong.';
        isValid = false;
      }
      if (!listingData.address.trim()) {
        newErrors.address = 'Alamat tidak boleh kosong.';
        isValid = false;
      }
      // Tambahkan validasi lain untuk step 3 jika perlu...
    }

    if (currentStep === 4) {
      if (listingData.mainPhotos.length < 5) {
        newErrors.mainPhotos = 'Harap upload minimal 5 foto utama.'; // Pesan error spesifik
        isValid = false;
      }
      if (
        listingData.rooms.some((room) => !room.title.trim() || room.price <= 0)
      ) {
        newErrors.rooms =
          'Pastikan semua kamar memiliki judul dan harga yang valid.'; // Pesan error spesifik
        isValid = false;
      }
      // ... validasi lain untuk step 4
    }

    // Update state error
    set({ errors: newErrors });

    if (isValid) {
      // Jika valid, bersihkan error dan lanjutkan ke step berikutnya
      set({ errors: {} });
      if (currentStep < 4) {
        set({ currentStep: currentStep + 1 });
      }
      return true; // Beri sinyal sukses
    }

    return false; // Beri sinyal gagal
  },

  setPropertyType: (type) =>
    set((state) => ({
      listingData: { ...state.listingData, propertyType: type },
      errors: { ...state.errors, propertyType: undefined },
    })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  goToStep: (step) => set({ currentStep: step }),

  setField: (field, value) =>
    set((state) => ({
      listingData: { ...state.listingData, [field]: value },
    })),

  // Action spesifik untuk koordinat
  setCoordinates: (coords) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        latitude: coords.lat,
        longitude: coords.lng,
      },
    })),

  addMainPhoto: (file) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        mainPhotos: [...state.listingData.mainPhotos, file],
      },
    })),
  removeMainPhoto: (index) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        mainPhotos: state.listingData.mainPhotos.filter((_, i) => i !== index),
      },
    })),

  addRoom: () =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        rooms: [
          ...state.listingData.rooms,
          { id: uuidv4(), title: '', maxGuests: 2, price: 0, photo: null },
        ],
      },
    })),

  updateRoomField: (roomId, field, value) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        rooms: state.listingData.rooms.map((room) =>
          room.id === roomId ? { ...room, [field]: value } : room,
        ),
      },
    })),

  setRoomPhoto: (roomId, file) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        rooms: state.listingData.rooms.map((room) =>
          room.id === roomId ? { ...room, photo: file } : room,
        ),
      },
    })),

  removeRoom: (roomId) =>
    set((state) => ({
      listingData: {
        ...state.listingData,
        rooms: state.listingData.rooms.filter((room) => room.id !== roomId),
      },
    })),
}));
