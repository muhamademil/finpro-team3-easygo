'use client';

import { useEffect, useState } from 'react';
import { getAllProperties } from '../lib/property';

export default function PropertyListPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProperties({ location: 'Bali', category: 'VILLA' });
      setProperties(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Explore Properti</h1>
      {properties.map((p: any) => (
        <div key={p.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-lg font-semibold">{p.name}</h2>
          <p className="text-sm text-gray-600">{p.location}</p>
        </div>
      ))}
    </div>
  );
}
