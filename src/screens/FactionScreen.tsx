import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Faction = {
  name: string;
  level: string;
  description: string;
  origin: { world: string; region: string; city: string };
  doctrine?: string;
  minTuVi?: string;
};

export default function FactionScreen() {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [myTuVi, setMyTuVi] = useState('Phàm nhân');

  useEffect(() => {
    axios.get('/factions').then(res => setFactions(res.data));
  }, []);

  const tuviRank = [
    'Phàm nhân', 'Luyện Khí', 'Trúc Cơ', 'Kim Đan',
    'Nguyên Anh', 'Hóa Thần', 'Phân Thần', 'Hợp Thể', 'Đại Thừa', 'Chuẩn Đạo', 'Thiên Đạo'
  ];

  const canJoin = (min: string = 'Phàm nhân') =>
    tuviRank.indexOf(myTuVi) >= tuviRank.indexOf(min);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Môn Phái</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factions.map(f => (
          <div key={f.name} className="p-4 border rounded-xl shadow-sm bg-white">
            <h2 className="text-lg font-semibold">{f.name}</h2>
            <p className="text-sm text-gray-500 italic">{f.level}</p>
            <p className="mt-1">{f.description}</p>
            <p className="mt-1 text-sm">Trụ sở: {f.origin?.world} – {f.origin?.region} – {f.origin?.city}</p>
            {f.doctrine && <p className="mt-1 text-sm italic text-indigo-600">"{f.doctrine}"</p>}
            <div className="mt-2">
              {canJoin(f.minTuVi) ? (
                <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">Xin gia nhập</button>
              ) : (
                <span className="text-sm text-red-500">Tu vi chưa đủ để gia nhập</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}