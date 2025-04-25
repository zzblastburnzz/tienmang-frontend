import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import axios from '../services/axiosInstance';
import COLORS from '../theme/colors';
import PaperView from '../theme/components/PaperView';
import PrimaryButton from '../theme/components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const userId = '662e8cf5ac57ae705b9b3041'; // demo

  const navigation = useNavigation();

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`/feed?userId=${userId}`);
      setPosts(res.data);
    } catch (err) {
      console.error('Lỗi lấy feed:', err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`/posts/${postId}/like`, { userId });
      fetchFeed();
    } catch (err) {
      console.error('Lỗi like:', err);
    }
  };

  const handleComment = async (postId) => {
    if (!comments[postId]?.trim()) return;
    try {
      await axios.post(`/comments`, {
        postId,
        userId,
        content: comments[postId]
      });
      setComments({ ...comments, [postId]: '' });
      fetchFeed();
    } catch (err) {
      console.error('Lỗi gửi comment:', err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) => (
        <PaperView key={index}>
          <TouchableOpacity onPress={() => navigation.navigate('CharacterProfile', { id: post.author._id })}>
            <Text style={styles.author}>{post.author?.name} ({post.author?.job})</Text>
          </TouchableOpacity>
          <Text style={styles.meta}>{new Date(post.createdAt).toLocaleString()}</Text>
          <Text style={styles.content}>{post.content}</Text>

          <PrimaryButton title="Quan tâm" onPress={() => handleLike(post._id)} />

          <View style={styles.commentSection}>
            <Text style={styles.subheading}>Bình luận:</Text>
            {post.comments?.map((cmt, i) => (
              <View key={i} style={styles.commentItem}>
                <Text style={styles.commentName}>{cmt.author?.name}:</Text>
                <Text style={styles.commentText}>{cmt.content}</Text>
              </View>
            ))}
            <TextInput
              style={styles.commentInput}
              value={comments[post._id] || ''}
              onChangeText={(text) => setComments({ ...comments, [post._id]: text })}
              placeholder="Viết phản hồi..."
              placeholderTextColor="#aaa"
            />
            <PrimaryButton title="Gửi" onPress={() => handleComment(post._id)} />
          </View>
        </PaperView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 12,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.accent,
  },
  meta: {
    fontSize: 12,
    color: '#777',
    marginBottom: 6,
  },
  content: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  commentSection: {
    marginTop: 12,
  },
  subheading: {
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 4,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  commentName: {
    fontWeight: '600',
    marginRight: 4,
    color: COLORS.text,
  },
  commentText: {
    color: COLORS.text,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 6,
    marginBottom: 8,
    backgroundColor: '#fff',
    color: COLORS.text,
  }
});
