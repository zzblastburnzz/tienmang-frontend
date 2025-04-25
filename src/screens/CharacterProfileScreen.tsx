// CharacterProfileScreen.tsx (dùng route.params thay useParams)
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosInstance';
import { getSocialLinks } from '../services/sociallinkService';

type CharacterProfile = {
  avatar: string;
  username: string;
  bio?: string;
  realTuVi: string;
  monPhai?: string;
  gioi?: string;
  chau?: string;
  thanh?: string;
  soThich?: string[];
  linhCan?: string;
  ngoTinh?: number;
};

export default function CharacterProfileScreen({ route }) {
  const { id } = route.params;
  const [profile, setProfile] = useState<CharacterProfile | null>(null);
  const [viewerTuVi, setViewerTuVi] = useState('Phàm nhân');
  const [relationship, setRelationship] = useState<any | null>(null);

  useEffect(() => {
    axios.get(`/profile/${id}`).then(res => setProfile(res.data));
    getSocialLinks(id).then(links => {
      const rel = links.find((l: any) => l.to?._id === id);
      setRelationship(rel);
    });
  }, [id]);

  if (!profile) return <div className="p-4">Đang tải hồ sơ...</div>;

  const showTuVi =
    viewerTuVi === 'Phàm nhân' && profile.realTuVi !== 'Phàm nhân'
      ? 'Không cảm nhận được tu vi'
      : profile.realTuVi;

  const mood = relationship?.score > 70 ? '❤️'
             : relationship?.score < 30 ? '❄️'
             : '😐';

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <div className="flex items-center gap-4">
        <img src={profile.avatar} alt="avatar" className="w-20 h-20 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">{profile.username}</h2>
          <p className="text-sm text-gray-500 italic">{profile.bio || 'Không có tiểu sử'}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p><strong>Tu vi:</strong> {showTuVi}</p>
        <p><strong>Môn phái:</strong> {profile.monPhai || 'Tán tu'}</p>
        <p><strong>Quê quán:</strong> {profile.gioi} – {profile.chau} – {profile.thanh}</p>
        {Array.isArray(profile.soThich) && profile.soThich.length > 0 && (
          <p><strong>Sở thích:</strong> {profile.soThich.join(', ')}</p>
        )}
        {profile.linhCan && <p><strong>Linh căn:</strong> {profile.linhCan}</p>}
        {profile.ngoTinh !== undefined && <p><strong>Ngộ tính:</strong> {profile.ngoTinh}</p>}

        {relationship && (
          <div className="mt-4">
            <p><strong>Mức độ quan hệ:</strong> {mood} ({relationship.score})</p>
            {relationship.memory?.slice(-3).map((m: string, i: number) => (
              <p key={i}>📌 {m}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
