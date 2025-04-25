// FriendCenterScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, Pressable } from 'react-native';
import axios from '../services/axiosInstance';

export default function FriendCenterScreen() {
  const userId = 'USER_ID'; // 🟡 Thay bằng ID thật nếu có
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);

  const fetchRequests = async () => {
    try {
      const res1 = await axios.get(`/friend-requests/received/${userId}`);
      const res2 = await axios.get(`/friend-requests/sent/${userId}`);
      setReceived(res1.data);
      setSent(res2.data);
    } catch (err) {
      console.error('Lỗi khi lấy lời mời:', err);
    }
  };

  const handleAccept = async (requestId) => {
    await axios.post('/friend-requests/accept', { requestId });
    fetchRequests();
  };

  const handleReject = async (requestId) => {
    await axios.post('/friend-requests/reject', { requestId });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>💌 Lời mời kết bạn đến</Text>
      {received.map((req, index) => (
        <View key={index} style={{ marginBottom: 12, padding: 8, backgroundColor: '#f3f3f3', borderRadius: 8 }}>
          <Text>{req.from?.name || 'NPC'}</Text>
          <Button title="Chấp nhận" onPress={() => handleAccept(req._id)} />
          <Button title="Từ chối" onPress={() => handleReject(req._id)} color="#888" />
        </View>
      ))}

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24 }}>📨 Lời mời đã gửi</Text>
      {sent.map((req, index) => (
        <View key={index} style={{ marginBottom: 12, padding: 8, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
          <Text>Đã gửi đến: {req.to?.name || 'NPC'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
