import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { firebase } from "../config";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      setEmail(user.email);
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            setName(userData.name);
          } else {
            console.log('User does not exist');
          }
        });

      // Fetch reservations for the user
      fetchReservations(user.email);
    }
  }, []);

  const fetchReservations = async (userEmail) => {
    try {
      const reservationsRef = firebase.firestore().collection("reservations");
      const query = reservationsRef.where("userEmail", "==", userEmail).get();

      const reservationData = [];
      (await query).forEach((doc) => {
        reservationData.push(doc.data());
      });

      setReservations(reservationData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {name}
        </Text>
        <Text style={{ fontSize: 18 }}>
          {email}
        </Text>

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
          Your Reservations:
        </Text>

        <FlatList
          data={reservations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reservationItem}>
              <Text>{item.restaurantName}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Time: {item.time}</Text>
              {/* Add more reservation details here */}
            </View>
          )}
        />

        <TouchableOpacity onPress={handleLogOut} style={styles.button}>
          <Text style={styles.buttonText}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%", // Adjust the width as needed
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20, // Adjust the margin as needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reservationItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    marginBottom: 10,
  },
});

export default ProfileScreen;
