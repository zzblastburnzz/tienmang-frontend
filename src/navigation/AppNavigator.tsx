import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ChatScreen from '../screens/ChatScreen';
import FeedScreen from '../screens/FeedScreen';
import FactionScreen from '../screens/FactionScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import CharacterProfileScreen from '../screens/CharacterProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  AuthLoading: undefined;
  Auth: undefined;
  Home: undefined;
  CharacterProfile: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

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
    <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Home" component={MainTabs} />
      <Stack.Screen name="CharacterProfile" component={CharacterProfileScreen} options={{ title: 'Hồ sơ nhân vật' }} />
    </Stack.Navigator>
  );
}