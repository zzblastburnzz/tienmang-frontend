import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import FeedScreen from '../screens/FeedScreen';
import FactionScreen from '../screens/FactionScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import CharacterProfileScreen from '../screens/CharacterProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Trò chuyện' }} />
      <Tab.Screen name="Feed" component={FeedScreen} options={{ title: 'Bảng tin' }} />
      <Tab.Screen name="Faction" component={FactionScreen} options={{ title: 'Tông phái' }} />
      <Tab.Screen name="Profile" component={MyProfileScreen} options={{ title: 'Cá nhân' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="CharacterProfile" component={CharacterProfileScreen} options={{ title: 'Hồ sơ nhân vật' }} />
    </Stack.Navigator>
  );
}
