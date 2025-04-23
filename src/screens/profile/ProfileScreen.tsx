import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.name}>👤 Tiểu Đạo Hữu</Text>
      <Text>Tu vi: Trúc Cơ sơ kỳ</Text>
      <Text>VIP: Không</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("VIPStatus")}>
        <Text style={styles.btnText}>🔓 Mở khóa đặc quyền VIP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  btn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#c7d2fe",
    borderRadius: 8
  },
  btnText: { fontWeight: "bold", textAlign: "center" }
});
