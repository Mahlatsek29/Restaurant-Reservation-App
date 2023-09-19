import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../config"; // Import your Firebase configuration
import { useNavigation } from "@react-navigation/native";

const BookingScreen = () => {
  const [reservations, setReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch reservations from Firestore
    const fetchReservations = async () => {
      try {
        const reservationsCollection = await firebase
          .firestore()
          .collection("reservations")
          .get();
        const reservationList = [];
        reservationsCollection.forEach((doc) => {
          reservationList.push({ id: doc.id, ...doc.data() });
        });
        setReservations(reservationList);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservation List</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <Text>Name: {item.userName}</Text>
            <Text>Email: {item.userEmail}</Text>
            <Text>Restaurant: {item.restaurantName}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Guests: {item.guests}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Navigate back to the previous screen
      >
        <Text style={styles.backButtonText}>Back to Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reservationItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    bottom: 20, // Position at the bottom of the screen
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});

export default BookingScreen;
