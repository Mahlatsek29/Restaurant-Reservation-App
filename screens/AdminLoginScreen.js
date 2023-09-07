import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const AdminLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticateAdmin = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return userCredential.user !== null;
    } catch (error) {
      console.error("Admin authentication error: ", error);
      return false;
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      // Check if email contains '@tablenumber'
      if (!email.includes('@tablenumber')) {
        alert("Admin login failed. Email must contain '@tablenumber'.");
        return;
      }

      if (!/\d{3}/.test(password)) {
        alert("Admin login failed. Password must contain a 3-digit number.");
        return;
      }

      const isAdminAuthenticated = await authenticateAdmin(email, password);

      if (isAdminAuthenticated) {
        navigation.push('Admin');
      } else {
        alert("Admin login failed. Please check your credentials.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      alert("Password reset failed. Please check your email and try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>Admin Login</Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginAdmin(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
          Login as Admin
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => resetPassword(email)}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "light", fontSize: 16 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "light", fontSize: 16 }}>
          Login as User
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
});
