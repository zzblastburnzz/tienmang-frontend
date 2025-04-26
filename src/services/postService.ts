import api from './axiosInstance';

export async function fetchPosts() {
  const response = await api.get('/posts/feed');
  return response.data;
}