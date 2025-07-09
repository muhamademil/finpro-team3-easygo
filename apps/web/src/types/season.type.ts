export interface SeasonRoom {
  id: string;
  name: string;
  base_price: number;
  max_guest: number;
}

export interface SeasonProperty {
  id: string;
  name: string;
  rooms: SeasonRoom[];
}

export interface CalendarDayData {
  date: string;
  is_available: boolean;
  price: number;
  has_peak_price?: boolean;
}

export interface PricingSettings {
  isActive: boolean;
  adjustmentType: 'nominal' | 'percentage';
  nominalAmount: string;
  percentageAmount: string;
}
