import React, { useState } from "react";
import { View, Image, Text, TextInput, Button, StyleSheet } from "react-native";
import images from "../components/images";
import logo2 from '../assets/logo2.png';
import { firebase } from "../config";

const MakeReservationScreen = ({ route }) => {
  const {
    selectedRestaurantName,
    selectedRestaurantDescription,
    selectedRestaurantImage,
    selectedRestaurantLocation,
    selectedDate,
    selectedTime,
    numberOfGuests,
  } = route.params;

  const db = firebase.firestore();
  
  const [editedDate, setEditedDate] = useState(selectedDate);
  const [editedTime, setEditedTime] = useState(selectedTime);
  const [editedGuests, setEditedGuests] = useState(numberOfGuests);

  const handleConfirmReservation = () => {
    if (!editedDate || !editedTime || !editedGuests) {
      alert("Please fill out all fields before confirming the reservation.");
      return;
    }

    db.collection("reservations")
    .add({
      restaurantName: selectedRestaurantName,
      restaurantDescription: selectedRestaurantDescription,
      restaurantLocation: selectedRestaurantLocation,
      date: editedDate,
      time: editedTime,
      guests: parseInt(editedGuests, 10), // Parse guests to an integer
    })
    .then(() => {
      console.log("Reservation added to Firestore!");
      // You can navigate to a success screen or perform other actions here
    })
    .catch((error) => {
      console.error("Error adding reservation to Firestore: ", error);
    });
};

  return (
    <View style={styles.container}>
      <Image source={logo2} style={styles.logo2} />
      <Image
        source={images[selectedRestaurantImage]}
        style={styles.restaurantImage}
      />
      <Text style={styles.text}>{selectedRestaurantName}</Text>
      <Text style={styles.text}>{selectedRestaurantDescription}</Text>
      <Text style={styles.text}>{selectedRestaurantLocation}</Text>

      <Text style={styles.text}>Selected Date: {editedDate}</Text>
      <TextInput
        style={styles.input}
        value={editedDate}
        onChangeText={setEditedDate}
        placeholder="Edit Date"
      />

      <Text style={styles.text}>Selected Time: {editedTime}</Text>
      <TextInput
        style={styles.input}
        value={editedTime}
        onChangeText={setEditedTime}
        placeholder="Edit Time"
      />

      <Text style={styles.text}>Number of Guests: {editedGuests}</Text>
      <TextInput
         style={styles.input}
         value={editedGuests.toString()}
         onChangeText={(text) => {
           const parsedValue = parseInt(text, 10);
           if (!isNaN(parsedValue)) {
             setEditedGuests(parsedValue);
           } else {
             setEditedGuests(""); // Clear the input if it's not a valid number
           }
         }}
         placeholder="Edit Number of Guests"
         keyboardType="numeric"
       />

      <Button
        title="Confirm Reservation"
        onPress={handleConfirmReservation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  logo2: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  restaurantImage: {
    width: "90%",
    height: 250,
    marginBottom: 10,
  },
  text: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default MakeReservationScreen;