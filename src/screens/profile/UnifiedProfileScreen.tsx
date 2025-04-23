import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function UnifiedProfileScreen({ route }) {
  const character = route?.params?.character;

  if (!character) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 16, color: "red" }}>
          Không tìm thấy thông tin nhân vật.
        </Text>
      </View>
    );
  }

  const {
    name,
    avatar,
    coverImage = "https://cdn.pixabay.com/photo/2016/11/14/03/16/mountains-1822647_1280.jpg",
    worldOrigin = "Không rõ",
    sect = "Vô Danh Môn",
    cultivationLevel = "Phàm nhân",
    personality = "Chưa rõ",
  } = character;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: coverImage }} style={styles.cover} />

      <View style={styles.profileBox}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>🌍 {worldOrigin}</Text>
        <Text style={styles.info}>🏯 Môn phái: {sect}</Text>
        <Text style={styles.info}>📈 Tu vi: {cultivationLevel}</Text>
        <Text style={styles.info}>💬 Tính cách: {personality}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}><Text style={styles.btnText}>Kết bạn</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text style={styles.btnText}>Nhắn tin</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cover: { width: "100%", height: 180 },
  profileBox: {
    backgroundColor: "#fff",
    marginTop: -40,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    alignItems: "center"
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: -45,
    marginBottom: 10
  },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  info: { fontSize: 14, color: "#555", marginBottom: 4 },
  actions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12
  },
  button: {
    backgroundColor: "#4e8bed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  btnText: { color: "#fff", fontWeight: "600" }
});
