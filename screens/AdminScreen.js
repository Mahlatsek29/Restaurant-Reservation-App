import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.navigate('Home'); // Navigate back to the Home screen
  };

  const goToRestaurantScreen = () => {
    navigation.navigate('Restaurant'); // Navigate to the Restaurant Screen
  };

  return (
    
    <ImageBackground
      source={require('../assets/admin.jpg')} // Adjust the path to your image
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.box} onPress={goToRestaurantScreen}>
          <Text style={styles.title}>Restaurants</Text>
        </TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.title}>Bookings</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Monthly Stats</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Arrivals</Text>
        </View>
        <Button title="Home" onPress={goBackToHome} color="black" />
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    // backgroundColor: 'rgba(0,0,0,0.5)', // Add a semi-transparent overlay
  },
  box: {
    width: windowWidth * 0.48, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    backgroundColor: 'black', // Set background color to black
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 75,
    // Add elevation or shadow styles for a clickable effect if desired
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Set text color to white
  },
});

export default AdminScreen;
