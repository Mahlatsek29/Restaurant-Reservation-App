import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { firebase } from "../config";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState([]);
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
            const userData = snapshot.data();
            setName(userData.name);
          } else {
            console.log("User does not exist");
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
      console.error("Error fetching reservations:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Login'); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.emailText}>{email}</Text>

        <Text style={styles.reservationsHeader}>Your Reservations:</Text>

        <FlatList
          data={reservations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reservationItem}>
              <Icon name="cutlery" size={20} color="white" style={styles.icon} />
              <Text style={styles.reservationItemLabel}></Text>
              <Text style={styles.reservationItemText}>{item.restaurantName}</Text>

              <Icon name="calendar" size={20} color="white" style={styles.icon} />
              <Text style={styles.reservationItemLabel}></Text>
              <Text style={styles.reservationItemText}>{item.date}</Text>

              <Icon name="clock-o" size={20} color="white" style={styles.icon} />
              <Text style={styles.reservationItemLabel}></Text>
              <Text style={styles.reservationItemText}>{item.time}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={handleLogOut} style={styles.button}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContent: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  emailText: {
    fontSize: 18,
    color: "white",
  },
  reservationsHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  reservationItem: {
    flexDirection: "column",
    borderWidth: 10,
    borderColor: "gray",
    padding: 30,
    marginBottom: 10,
    borderRadius: 25,
  },
  reservationItemLabel: {
    color: "white",
    fontWeight: "bold",
  },
  reservationItemText: {
    color: "white",
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default ProfileScreen;
