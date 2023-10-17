import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, StatusBar, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const AdminLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticateAdmin = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return userCredential.user !== null;
    } catch (error) {
      console.error("Admin authentication error: ", error);
      return false;
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      if (!email.includes('@tablenumber')) {
        ToastAndroid.show("Admin login failed. Email must contain '@tablenumber'.", ToastAndroid.SHORT);
        return;
      }

      if (!/\d{3}/.test(password)) {
        ToastAndroid.show("Admin login failed. Password must contain a 3-digit number.", ToastAndroid.SHORT);
        return;
      }

      const isAdminAuthenticated = await authenticateAdmin(email, password);

      if (isAdminAuthenticated) {
        navigation.push('Admin');
      } else {
        ToastAndroid.show("Admin login failed. Please check your credentials.", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  const resetPassword = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      ToastAndroid.show("Password reset email sent. Please check your inbox.", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Password reset failed. Please check your email and try again.", ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.card}>
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
          <Text style={{ fontWeight: "400", fontSize: 16 }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "400", fontSize: 16 }}>
            Login as User
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  card: {
    width: 350,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
});
