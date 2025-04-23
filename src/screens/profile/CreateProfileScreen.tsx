import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function CreateProfileScreen() {
  const [sect, setSect] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!sect || !location) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập nơi ở và môn phái.");
      return;
    }

    const profile = { sect, location, bio, avatar: "" };
    await AsyncStorage.setItem("user_profile", JSON.stringify(profile));
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo hồ sơ người dùng</Text>
      <TextInput
        style={styles.input}
        placeholder="Môn phái"
        value={sect}
        onChangeText={setSect}
      />
      <TextInput
        style={styles.input}
        placeholder="Nơi ở"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Giới thiệu bản thân"
        value={bio}
        onChangeText={setBio}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Hoàn tất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  button: {
    backgroundColor: "#4e8bed",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: { color: "white", fontWeight: "bold" }
});
