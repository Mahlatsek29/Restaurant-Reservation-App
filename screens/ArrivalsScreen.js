import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../config"; // Import your Firebase configuration
import { useNavigation } from "@react-navigation/native";

const ArrivalsScreen = () => {
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

  const confirmArrival = async (reservationId) => {
    try {
      await firebase
        .firestore()
        .collection("reservations")
        .doc(reservationId)
        .update({ isArrived: true });
      // After updating the reservation, you can update the UI to reflect the change.
      // You might also want to implement real-time updates for this.
    } catch (error) {
      console.error("Error confirming arrival:", error);
    }
  };

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
            {!item.isArrived && (
              <Button
                title="Confirm Arrival"
                onPress={() => confirmArrival(item.id)}
              />
            )}
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Navigate back to the previous screen
      >
        <Text style={styles.backButtonText}>Back </Text>
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
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 15,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Set text color to white
  },
});

export default ArrivalsScreen;
