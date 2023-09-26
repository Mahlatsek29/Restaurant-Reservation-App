import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../config'; 
import images from '../components/images';

function RestaurantScreen({ addRestaurantToScreen, navigation }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const firestore = firebase.firestore();

    const unsubscribe = firestore
      .collection('restaurants')
      .onSnapshot((snapshot) => {
        const restaurantList = [];
        snapshot.forEach((doc) => {
          restaurantList.push({ id: doc.id, ...doc.data() });
        });
        setRestaurants(restaurantList);
      });

    return () => unsubscribe();
  }, []);

  const addRestaurantToFirestore = (restaurant) => {
    const firestore = firebase.firestore();

    if (
      restaurant.name &&
      restaurant.description &&
      restaurant.image &&
      restaurant.location
    ) {
      firestore
        .collection('restaurants')
        .add({
          name: restaurant.name,
          description: restaurant.description,
          image: restaurant.image,
          location: restaurant.location,
        })
        .then((restaurantDocRef) => {
          // Call the addRestaurant function to update the screen
          addRestaurantToScreen({
            id: restaurantDocRef.id,
            name: restaurant.name,
            description: restaurant.description,
            image: restaurant.image,
            location: restaurant.location,
          });
        })
        .catch((error) => {
          console.error('Error adding restaurant to Firestore:', error);
        });
    } else {
      console.error('Invalid restaurant data:', restaurant);
    }
  };

  const handleBackToAdmin = () => {
    navigation.navigate('Admin'); 
  };

  return (
    <ScrollView style={styles.container}>
      {restaurants.map((restaurant) => (
        <View key={restaurant.id} style={styles.card}>
          <Image
            style={styles.image}
            source={images[restaurant.image]}
          />
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>
          <Text style={styles.location}>{restaurant.location}</Text>
          <Button
            title="Add to Reservations"
            onPress={() => addRestaurantToFirestore(restaurant)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={handleBackToAdmin}>
        <Text style={styles.backButtonText}>Back </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RestaurantScreen;
