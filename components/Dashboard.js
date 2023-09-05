import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setName(snapshot.data());
          } else {
            console.log('User does not exist');
          }
        });
    }
  }, []);

  const handleLogOut = () => {
    firebase.auth().logOut().catch((error) => {
      console.error("Error logging out:", error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Hello, {name.name}
      </Text>
      <TouchableOpacity onPress={handleLogOut} style={styles.button}>
        <Text style={styles.buttonText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
