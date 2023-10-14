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
import { firebase } from "../config"; 

const AdminScreen = () => {
  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.navigate("Home");
  };

  const goToRestaurantScreen = () => {
    navigation.navigate("Restaurant"); 
  };

  const goToBookingScreen = () => {
    navigation.navigate("Bookings");
  };
  const goToMonthlyStatsScreen = () => {
    navigation.navigate("MonthlyStats");
  };


  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("AdminLogin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/admin.jpg")}
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
        <TouchableOpacity style={styles.box} onPress={goToBookingScreen}>
          <Text style={styles.title}>Monthly Stats</Text>
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
    resizeMode: "cover",
    justifyContent: "center", 
    alignItems: "center", 
  },
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
  },
  box: {
    width: windowWidth * 0.48, 
    height: 150, 
    backgroundColor: "black", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 75,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", 
  },
  logoutButton: {
    width: windowWidth * 0.48,
    height: 40,
    backgroundColor: "white", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 75,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  homeButton: {
    width: windowWidth * 0.48,
    height: 40,
    backgroundColor: "white", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 75,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default AdminScreen;
