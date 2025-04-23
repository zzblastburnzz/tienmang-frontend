import React, { useEffect, useState } from 'react';
import axios from 'axios';

type City = { name: string; description: string };
type Region = { name: string; cities: City[] };
type World = { name: string; description: string; regions: Region[] };

export default function WorldScreen() {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  useEffect(() => {
    axios.get('/worlds').then(res => setWorlds(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cửu Giới</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {worlds.map((w) => (
          <div
            key={w.name}
            onClick={() => {
              setSelectedWorld(w);
              setSelectedRegion(null);
            }}
            className="cursor-pointer p-4 border rounded-xl hover:bg-gray-50"
          >
            <h2 className="font-semibold">{w.name}</h2>
            <p className="text-sm text-gray-500">{w.description}</p>
          </div>
        ))}
      </div>

      {selectedWorld && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">{selectedWorld.name} – Các châu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedWorld.regions.map((r) => (
              <div
                key={r.name}
                onClick={() => setSelectedRegion(r)}
                className="cursor-pointer p-3 border rounded-xl hover:bg-blue-50"
              >
                <h3 className="font-medium">{r.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedRegion && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">{selectedRegion.name} – Địa danh</h3>
          <ul className="list-disc list-inside">
            {selectedRegion.cities.map((c) => (
              <li key={c.name}>{c.name} – {c.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}