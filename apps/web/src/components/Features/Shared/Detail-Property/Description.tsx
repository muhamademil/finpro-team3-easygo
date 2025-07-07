'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = description.length > 350;
  const displayText =
    shouldTruncate && !isExpanded
      ? description.substring(0, 350) + '...'
      : description;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Description</h2>
      <div className="space-y-3">
        <p className="text-gray-700 leading-relaxed">{displayText}</p>
        {shouldTruncate && (
          <Button
            variant="link"
            className="p-0 h-auto text-blue-600 hover:text-blue-800"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Tampilkan lebih sedikit' : 'Tampilkan lebih banyak'}
          </Button>
        )}
      </div>
    </div>
  );
}
