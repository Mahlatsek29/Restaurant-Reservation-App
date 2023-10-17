import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const registerUser = async (email, password, name, surname) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://restaurant-ddb93.firebaseapp.com",
      });
      alert("Verification email sent");

      await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
        name,
        surname,
        email,
      });

      // Delay the navigation by a few seconds (e.g., 2 seconds)
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 23 }}>Register</Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={(name) => setName(name)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Surname"
          onChangeText={(surname) => setSurname(surname)}
          autoCorrect={false}
        />
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
        <TouchableOpacity
          onPress={() => registerUser(email, password, name, surname)}
          style={styles.button}
        >
          <Text style={{ fontWeight: "light", fontSize: 22, color: "#fff" }}>
            Register
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "light", fontSize: 16 }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
        
      </View>
    </View>
  ); 
};

export default RegistrationScreen;

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