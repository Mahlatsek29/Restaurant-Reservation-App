import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { firebase } from "../config";

const ConfirmationScreen = ({ route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { reservationData } = route.params;
  const navigation = useNavigation();

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
            setName(snapshot.data().name);
          } else {
            console.log('User does not exist');
          }
        });
    }
  }, []);

  const saveReservationToFirestore = async () => {
    try {
      const user = firebase.auth().currentUser;

      if (!user) {
        console.log('User not authenticated');
        return;
      }

      const reservation = {
        userName: name,
        userEmail: email,
        restaurantName: reservationData.restaurantName,
        restaurantLocation: reservationData.restaurantLocation,
        date: reservationData.date,
        time: reservationData.time,
        guests: reservationData.guests,
      };

      await firebase.firestore().collection("reservations").add(reservation);

      console.log('Reservation data saved to Firestore');
    } catch (error) {
      console.error('Error saving reservation data:', error);
    }
  };

  const onFinishedPress = () => {
    saveReservationToFirestore();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={reservationData.restaurantImage} style={styles.restaurantImage} />
    
      <Text style={styles.congratulationsText}>
        Congratulations, {name}!
      </Text>
      <Text style={styles.congratulationsMessage}>
        Your reservation at {reservationData.restaurantName} is confirmed. Enjoy your dining experience!
      </Text>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{email}</Text>
      <View style={styles.detailContainer}>
        <FontAwesome name="cutlery" size={24} color="white" />
        <Text style={styles.detailText}>{reservationData.restaurantName}</Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesome name="map-marker" size={24} color="white" />
        <Text style={styles.detailText}>{reservationData.restaurantLocation}</Text>
      </View>

      <View style={styles.detailContainer}>
        <AntDesign name="calendar" size={24} color="white" />
        <Text style={styles.detailText}>{reservationData.date}</Text>
      </View>

      <View style={styles.detailContainer}>
        <AntDesign name="clockcircleo" size={24} color="white" />
        <Text style={styles.detailText}>{reservationData.time}</Text>
      </View>

      <View style={styles.detailContainer}>
        <FontAwesome name="users" size={24} color="white" />
        <Text style={styles.detailText}>Guests: {reservationData.guests}</Text>
      </View>

      <TouchableOpacity onPress={onFinishedPress} style={styles.finishedButton}>
        <Text style={styles.finishedButtonText}>Finished</Text>
      </TouchableOpacity>
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
    top: 75,
    left: 40,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 25,
  },
  restaurantImage: {
    width: "90%",
    height: 250,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    color: "white",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
  },
  finishedButton: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 25,
  },
  finishedButtonText: {
    color: "white",
    fontSize: 18,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  congratulationsMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
});

export default ConfirmationScreen;
