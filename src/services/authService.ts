import api from './axiosInstance';
import * as SecureStore from 'expo-secure-store';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.token;
  await SecureStore.setItemAsync('token', token);
  return token;
}

export async function register(name: string, email: string, password: string) {
  const response = await api.post('/auth/register', { name, email, password });
  const token = response.data.token;
  await SecureStore.setItemAsync('token', token);
  return token;
}