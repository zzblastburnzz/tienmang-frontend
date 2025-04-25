import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from '../services/axiosInstance';
import AcceptChatJobButton from '../components/AcceptChatJobButton';

export default function ChatScreen({ route }) {
  const { conversationId, userId, npcId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/chat/conversation/${conversationId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Lỗi lấy tin nhắn:', err);
    }
  };

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    try {
      const res = await axios.post('/chat/send', {
        conversationId,
        sender: userId,
        receiver: npcId,
        text: newMsg
      });
      setMessages(prev => [...prev, res.data]);
      setNewMsg('');
    } catch (err) {
      console.error('Lỗi gửi tin nhắn:', err);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.sender === userId ? styles.rightBubble : styles.leftBubble
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
            {msg.jobSuggestion && (
              <AcceptChatJobButton jobId={msg.jobSuggestion} npcId={npcId} userId={userId} />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={newMsg}
          onChangeText={setNewMsg}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5efe0' },
  messageContainer: { padding: 12 },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#fff5da',
  },
  leftBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff5da',
    borderColor: '#b59b72',
    borderWidth: 1
  },
  rightBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#d3f4e4',
    borderColor: '#7fbf9e',
    borderWidth: 1
  },
  messageText: { fontSize: 16 },
  inputRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#faf5e5'
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#6a4e34',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold' }
});
