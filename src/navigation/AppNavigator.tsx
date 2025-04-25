import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './FeedScreen';
import ChatListScreen from './ChatListScreen';
import FactionScreen from './FactionScreen';
import MyProfileScreen from './MyProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="Chat" component={ChatListScreen} options={{ title: 'Trò chuyện' }} />
      <Tab.Screen name="Feed" component={FeedScreen} options={{ title: 'Bảng tin' }} />
      <Tab.Screen name="Faction" component={FactionScreen} options={{ title: 'Tông phái' }} />
      <Tab.Screen name="Profile" component={MyProfileScreen} options={{ title: 'Cá nhân' }} />
    </Tab.Navigator>
  );
}
