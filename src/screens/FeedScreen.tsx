// FeedScreen.tsx (hiển thị bài viết + nghề nghiệp + bình luận + nút Quan tâm)
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const navigation = useNavigation();

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy feed:', err);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(`/comments?postId=${postId}`);
      setComments((prev) => ({ ...prev, [postId]: res.data }));
    } catch (err) {
      console.error('Lỗi khi lấy bình luận:', err);
    }
  };

  const handleComment = async (postId) => {
    try {
      await axios.post('/comments', {
        postId,
        author: 'USER_ID', // thay bằng user thực tế
        content: newComment[postId]
      });
      setNewComment((prev) => ({ ...prev, [postId]: '' }));
      fetchComments(postId);
    } catch (err) {
      console.error('Lỗi khi gửi bình luận:', err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post('/posts/like', { postId, userId: 'USER_ID' });
      fetchPosts();
    } catch (err) {
      console.error('Lỗi khi like bài viết:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>📰 Bảng Tin Tu Tiên</Text>

      {posts.map((post, index) => (
        <View
          key={index}
          style={{ marginBottom: 24, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 8 }}
        >
          <Pressable onPress={() => navigation.navigate('CharacterProfile', { id: post.author?._id })}>
            <Text style={{ fontWeight: 'bold', color: '#3b82f6' }}>{post.author?.name || 'NPC Ẩn Danh'}</Text>
          </Pressable>
          {post.author?.role && (
            <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#666' }}>
              🧭 Nghề nghiệp: {post.author.role}
            </Text>
          )}
          <Text style={{ marginTop: 4 }}>{post.content}</Text>
          <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
            Đăng lúc: {new Date(post.createdAt).toLocaleString()}
          </Text>

          <TouchableOpacity onPress={() => handleLike(post._id)}>
            <Text style={{ color: '#e11d48', marginTop: 8 }}>❤️ Quan tâm ({post.likes || 0})</Text>
          </TouchableOpacity>

          {/* Bình luận */}
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>💬 Bình luận:</Text>
            {(comments[post._id] || []).map((cmt, idx) => (
              <Text key={idx} style={{ fontSize: 13, marginLeft: 8 }}>
                • <Text style={{ fontWeight: 'bold' }}>{cmt.authorName}</Text>: {cmt.content}
              </Text>
            ))}
            <TextInput
              value={newComment[post._id] || ''}
              onChangeText={(text) => setNewComment((prev) => ({ ...prev, [post._id]: text }))}
              placeholder="Viết bình luận..."
              style={{ borderBottomWidth: 1, fontSize: 13, marginTop: 4 }}
            />
            <Button title="Gửi" onPress={() => handleComment(post._id)} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}