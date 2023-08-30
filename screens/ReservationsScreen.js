import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import images from "../components/images";

const ReservationScreen = ({ route }) => {
  const {
    selectedRestaurantName,
    selectedRestaurantDescription,
    selectedRestaurantImage,
    selectedRestaurantLocation,
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={images[selectedRestaurantImage]} style={styles.cardImage} />
        <Text>{selectedRestaurantName}</Text>
        <Text>{selectedRestaurantDescription}</Text>
        <Text>{selectedRestaurantLocation}</Text>
        <Text>{selectedRestaurantLocation}</Text>
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
  card: {
    width: 300,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
});

export default ReservationScreen;
