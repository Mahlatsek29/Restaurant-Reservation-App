import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

const BookingScreen = () => {
  const [reservations, setReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
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

  const sections = [
    { title: "Restaurant", data: reservations },
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Restaurant</Text> */}
      <SectionList
        sections={sections}
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
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
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
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 15,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default BookingScreen;
