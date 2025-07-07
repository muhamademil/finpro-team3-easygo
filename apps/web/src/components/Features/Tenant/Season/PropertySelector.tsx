'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Propertyadd } from '@/types/type';

interface PropertySelectorProps {
  properties: Propertyadd[];
  selectedProperty: string;
  onPropertyChange: (propertyId: string) => void;
}

export default function PropertySelector({
  properties,
  selectedProperty,
  onPropertyChange,
}: PropertySelectorProps) {
  return (
    <div className="mb-6">
      <Select value={selectedProperty} onValueChange={onPropertyChange}>
        <SelectTrigger className="w-64">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {properties.map((property) => (
            <SelectItem key={property.id} value={property.id}>
              {property.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
