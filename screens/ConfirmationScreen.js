import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ConfirmationScreen = ({ route }) => {
  const { reservationData } = route.params;
  const navigation = useNavigation(); 

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress} 
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image source={reservationData.restaurantImage} style={styles.restaurantImage} />
      <Text style={styles.text}>{reservationData.restaurantName}</Text>
      <Text style={styles.text}>Location: {reservationData.restaurantLocation}</Text>
      <Text style={styles.text}>Date: {reservationData.date}</Text>
      <Text style={styles.text}>Time: {reservationData.time}</Text>
      <Text style={styles.text}>Guests: {reservationData.guests}</Text>
      
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "white", 
    fontSize: 16,
  },
  restaurantImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "white", 
  },
});

export default ConfirmationScreen;
