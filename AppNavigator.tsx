// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './screens/FeedScreen';
import CharacterProfileScreen from './screens/CharacterProfileScreen';
import FriendCenterScreen from './screens/FriendCenterScreen';
import ChatScreen from './screens/ChatScreen';
import JobBoardScreen from './screens/JobBoardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={FeedScreen} options={{ title: '📰 Bảng Tin Tu Tiên' }} />
      <Stack.Screen name="CharacterProfile" component={CharacterProfileScreen} options={{ title: '👤 Hồ Sơ Nhân Vật' }} />
      <Stack.Screen name="FriendCenter" component={FriendCenterScreen} options={{ title: '💌 Kết Bạn' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: '💬 Nhắn Tin' }} />
      <Stack.Screen name="JobBoard" component={JobBoardScreen} options={{ title: '📋 Việc Làm' }} />
    </Stack.Navigator>
  );
}
