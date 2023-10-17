import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.push('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.card}>
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Login</Text>
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
        <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'light', fontSize: 16 }}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')} style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'light', fontSize: 16 }}>Login as Admin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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

export default LoginScreen;
