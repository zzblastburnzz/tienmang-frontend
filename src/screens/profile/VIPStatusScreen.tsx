import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VIPStatusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Trạng thái VIP</Text>
      <Text>Chưa mở khóa VIP. Tu luyện thêm để đạt quyền lợi đặc biệt.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 }
});
