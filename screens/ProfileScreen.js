import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    username: "JohnDoe",
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.text}>{userInfo.username}</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.text}>{userInfo.name}</Text>
      <Text style={styles.label}>Surname:</Text>
      <Text style={styles.text}>{userInfo.surname}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{userInfo.email}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.text}>{userInfo.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default ProfileScreen;
