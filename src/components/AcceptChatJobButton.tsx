// components/AcceptChatJobButton.tsx
import React from 'react';
import { Button } from 'react-native';
import axios from 'axios';

export default function AcceptChatJobButton({ jobId, npcId, userId, onAccepted }) {
  const handleAccept = async () => {
    try {
      await axios.post(`/jobs/accept`, {
        jobId,
        userId
      });
      await axios.post(`/chat/remind`, {
        npcId,
        userId,
        text: `Ta đã nhận nhiệm vụ đó rồi, mong ngươi giao thêm chi tiết.`
      });
      onAccepted();
    } catch (err) {
      console.error('Lỗi khi nhận nhiệm vụ:', err);
    }
  };

  return (
    <Button title="Nhận nhiệm vụ này" onPress={handleAccept} />
  );
}
