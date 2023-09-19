import React, { useState } from "react";
import { View, Image, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import images from "../components/images";
import { AntDesign } from "@expo/vector-icons";
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

  const navigation = useNavigation(); 

  const handleBackButton = () => {
    navigation.goBack();
  };

  const db = firebase.firestore();

  const [editedDate, setEditedDate] = useState(selectedDate);
  const [editedTime, setEditedTime] = useState(selectedTime);
  const [editedGuests, setEditedGuests] = useState(numberOfGuests);
  
  const handleConfirmReservation = () => {
    if (!editedDate || !editedTime || !editedGuests) {
      alert("Please fill out all fields before confirming the reservation.");
      return;
    }

    const reservationData = {
      restaurantName: selectedRestaurantName,
      restaurantImage: images[selectedRestaurantImage],
      restaurantLocation: selectedRestaurantLocation,
      date: editedDate,
      time: editedTime,
      guests: parseInt(editedGuests, 10),
    };

    navigation.navigate('ConfirmationScreen', { reservationData });
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <AntDesign name="arrowleft" size={20} color="white" />
        <Text style={styles.whiteButtonText}>Back</Text>
      </TouchableOpacity>
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
             setEditedGuests(""); 
           }
         }}
         placeholder="Edit Number of Guests"
         keyboardType="numeric"
       />

      <Button
        title="Confirm Reservation"
        onPress={handleConfirmReservation}
        style={styles.confirmButton} 
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
    borderRadius: 15,
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 40,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 25,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
});

export default MakeReservationScreen;
