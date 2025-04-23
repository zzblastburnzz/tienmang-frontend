import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WorldScreen() {
  const [worlds, setWorlds] = useState([]);
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    axios.get('/worlds').then(res => setWorlds(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🌍 Danh sách các giới</h1>
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
            {w.ruler && (
              <p className="text-sm italic text-indigo-600 mt-1">Giới chủ: {w.ruler.name}</p>
            )}
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
                className="cursor-pointer p-4 border rounded-xl hover:bg-blue-50"
              >
                <h3 className="font-semibold">{r.name}</h3>
                {r.ruler && (
                  <p className="text-sm italic text-purple-600">Trưởng châu: {r.ruler.name}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedRegion && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">{selectedRegion.name} – Địa danh</h3>
          <ul className="list-disc list-inside">
            {selectedRegion.cities.map((c) => (
              <li key={c.name}>
                {c.name} – {c.description}
                {c.ruler && (
                  <span className="text-sm text-rose-600"> | Thành chủ: {c.ruler.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
