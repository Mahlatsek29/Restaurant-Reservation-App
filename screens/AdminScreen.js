import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config"; // Import your Firebase configuration

const AdminScreen = () => {
  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.navigate("Home"); // Navigate back to the Home screen
  };

  const goToRestaurantScreen = () => {
    navigation.navigate("Restaurant"); // Navigate to the Restaurant Screen
  };

  const goToBookingScreen = () => {
    navigation.navigate("Bookings"); // Navigate to the Bookings Screen
  };

  const goToMonthlyStatsScreen = () => {
    navigation.navigate("MonthlyStats"); // Navigate to the Monthly Stats Screen
  };

  const goToArrivalsScreen = () => {
    navigation.navigate("Arrivals"); // Navigate to the Arrivals Screen
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut(); // Sign the user out
      navigation.navigate("AdminLogin"); // Navigate to the Login screen or your desired destination
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/admin.jpg")} // Adjust the path to your image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Your existing buttons */}
        <TouchableOpacity style={styles.box} onPress={goToRestaurantScreen}>
          <Text style={styles.title}>Restaurants</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={goToBookingScreen}>
          <Text style={styles.title}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={goToMonthlyStatsScreen}>
          <Text style={styles.title}>Monthly Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={goToArrivalsScreen}>
          <Text style={styles.title}>Arrivals</Text>
        </TouchableOpacity>
        {/* Home button */}
        <TouchableOpacity style={styles.homeButton} onPress={goBackToHome}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cover the entire screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  box: {
    width: windowWidth * 0.48, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    backgroundColor: "black", // Set background color to black
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 75,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", // Set text color to white
  },
  logoutButton: {
    width: windowWidth * 0.48,
    height: 40,
    backgroundColor: "red", // You can change the color
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 75,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  homeButton: {
    width: windowWidth * 0.48,
    height: 40,
    backgroundColor: "green", // You can change the color
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 75,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default AdminScreen;
