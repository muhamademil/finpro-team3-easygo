'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { PercentageOption } from '@/types/type';

const percentageOptions: PercentageOption[] = [
  { value: '5', label: '5%' },
  { value: '10', label: '10%' },
  { value: '15', label: '15%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30%' },
];

interface PriceControlPanelProps {
  selectedDate: string | null;
  basePrice: number;
  isRentalActive: boolean;
  onRentalActiveChange: (active: boolean) => void;
  priceAdjustmentType: string;
  onPriceAdjustmentTypeChange: (type: string) => void;
  nominalAmount: string;
  onNominalAmountChange: (amount: string) => void;
  percentageAmount: string;
  onPercentageAmountChange: (percentage: string) => void;
  onSave: () => void;
  loading: boolean;
}

export default function PriceControlPanel({
  selectedDate,
  basePrice,
  isRentalActive,
  onRentalActiveChange,
  priceAdjustmentType,
  onPriceAdjustmentTypeChange,
  nominalAmount,
  onNominalAmountChange,
  percentageAmount,
  onPercentageAmountChange,
  onSave,
  loading,
}: PriceControlPanelProps) {
  const calculatePreviewPrice = (): number => {
    if (!isRentalActive) return 0;

    if (priceAdjustmentType === 'nominal' && nominalAmount) {
      return basePrice + Number.parseInt(nominalAmount.replace(/\D/g, ''));
    } else if (priceAdjustmentType === 'percentage' && percentageAmount) {
      const increase = basePrice * (Number.parseInt(percentageAmount) / 100);
      return basePrice + increase;
    }
    return basePrice;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatInputPrice = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return new Intl.NumberFormat('id-ID').format(Number.parseInt(numbers) || 0);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleNominalInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value.replace(/\D/g, '');
    onNominalAmountChange(formatInputPrice(value));
  };

  const previewPrice = calculatePreviewPrice();

  return (
    <Card className="p-6">
      {/* Current Price */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Harga Dasar
        </h3>
        <div className="text-2xl font-bold text-gray-900">
          IDR {formatPrice(basePrice)}
        </div>
        {selectedDate && (
          <div className="text-sm text-gray-500 mt-1">
            {formatDate(new Date(selectedDate))}
          </div>
        )}
      </div>

      {selectedDate && (
        <>
          {/* Rental Toggle */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              Matikan Sewa
            </h4>
            <div className="flex items-center space-x-3 mb-3">
              <Switch
                checked={isRentalActive}
                onCheckedChange={onRentalActiveChange}
                disabled={loading}
              />
              <span
                className={`text-sm font-medium ${isRentalActive ? 'text-green-600' : 'text-red-600'}`}
              >
                {isRentalActive ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Nggak bisa terima tamu di tanggal tertentu? Tekan geser tombol ke
              &quot;Off&quot; untuk nonaktifkan sewa di hari itu.
            </p>
          </div>

          {/* Price Adjustment */}
          {isRentalActive && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Naikkan Harga
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                Mau pasang harga spesial saat long weekend atau liburan? Tinggal
                tentukan tanggal dan tambahkan nominal atau persentase kenaikan.
              </p>

              <Select
                value={priceAdjustmentType}
                onValueChange={onPriceAdjustmentTypeChange}
                disabled={loading}
              >
                <SelectTrigger className="mb-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nominal">By Nominal</SelectItem>
                  <SelectItem value="percentage">By Percentage</SelectItem>
                </SelectContent>
              </Select>

              {priceAdjustmentType === 'nominal' ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tambahan Nominal (IDR)
                  </label>
                  <Input
                    type="text"
                    value={nominalAmount}
                    onChange={handleNominalInputChange}
                    placeholder="0"
                    className="w-full"
                    disabled={loading}
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Persentase Kenaikan
                  </label>
                  <Select
                    value={percentageAmount}
                    onValueChange={onPercentageAmountChange}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {percentageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Preview Harga</div>
                <div className="text-xl font-bold text-gray-900">
                  IDR {formatPrice(previewPrice)}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={onSave}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </>
      )}

      {!selectedDate && (
        <div className="text-center text-gray-500 py-8">
          <p>Pilih tanggal di kalender untuk mengatur harga</p>
        </div>
      )}
    </Card>
  );
}
