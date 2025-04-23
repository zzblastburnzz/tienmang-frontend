// ChatScreen.tsx (tích hợp AcceptChatJobButton)
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import axios from 'axios';
import AcceptChatJobButton from '../components/AcceptChatJobButton';

export default function ChatScreen({ route }) {
  const { conversationId, userId, npcId } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [latestJobId, setLatestJobId] = useState<string | null>(null);

  const fetchMessages = async () => {
    const res = await axios.get(`/messages/${conversationId}`);
    setMessages(res.data);
  };

  const handleSend = async () => {
    const res = await axios.post(`/messages/${conversationId}`, {
      sender: userId,
      text: input
    });
    setMessages(prev => [...prev, ...res.data]);
    setInput('');

    // kiểm tra có job trong phản hồi không
    const jobText = res.data.find(m => m.text.includes('Ta sẽ giao nhiệm vụ này cho ngươi:'));
    if (jobText) {
      const jobIdMatch = jobText.text.match(/nhiệm vụ này cho ngươi: (.+?)\./);
      if (jobIdMatch) {
        const title = jobIdMatch[1];
        const jobRes = await axios.get(`/jobs/by-title`, { params: { title } });
        if (jobRes.data?._id) setLatestJobId(jobRes.data._id);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((m, i) => (
          <View key={i} style={{ marginVertical: 4 }}>
            <Text><Text style={{ fontWeight: 'bold' }}>{m.sender === userId ? 'Bạn' : 'NPC'}:</Text> {m.text}</Text>
          </View>
        ))}
        {latestJobId && (
          <AcceptChatJobButton
            jobId={latestJobId}
            npcId={npcId}
            userId={userId}
            onAccepted={() => setLatestJobId(null)}
          />
        )}
      </ScrollView>

      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 8 }}
        />
        <Button title="Gửi" onPress={handleSend} />
      </View>
    </View>
  );
}