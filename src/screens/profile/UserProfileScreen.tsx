import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../utils/auth";

export default function UserProfileScreen() {
  const [profile, setProfile] = useState({
    username: "",
    sect: "",
    location: "",
    bio: "",
    avatar: ""
  });
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const creds = await AsyncStorage.getItem("user_credentials");
      const stored = await AsyncStorage.getItem("user_profile");
      if (creds && stored) {
        const { username } = JSON.parse(creds);
        setProfile({ username, ...JSON.parse(stored) });
      }
    };
    load();
  }, []);

  const saveChanges = async () => {
    const { sect, location, bio, avatar } = profile;
    await AsyncStorage.setItem("user_profile", JSON.stringify({ sect, location, bio, avatar }));
    Alert.alert("Lưu thành công", "Thông tin hồ sơ đã được cập nhật.");
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "Signup" }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>
      <Text style={styles.label}>Tên người dùng (không đổi):</Text>
      <Text style={styles.username}>{profile.username}</Text>

      <Text style={styles.label}>Môn phái:</Text>
      <TextInput style={styles.input} value={profile.sect} onChangeText={(text) => setProfile({ ...profile, sect: text })} />

      <Text style={styles.label}>Nơi ở:</Text>
      <TextInput style={styles.input} value={profile.location} onChangeText={(text) => setProfile({ ...profile, location: text })} />

      <Text style={styles.label}>Giới thiệu bản thân:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
      />

      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Lưu thay đổi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#999" }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "600", marginBottom: 6 },
  username: { fontSize: 16, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16
  },
  button: {
    backgroundColor: "#4e8bed",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: { color: "white", fontWeight: "bold" }
});
