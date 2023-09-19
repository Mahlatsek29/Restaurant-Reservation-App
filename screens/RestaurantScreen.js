import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { firebase } from '../config';
import images from '../components/images';

function RestaurantScreen({ addRestaurantToScreen, addReservationToScreen }) {
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
          // Now, add the reservation to the "reservations" collection
          firestore
            .collection('reservations')
            .add({
              restaurantId: restaurantDocRef.id,
              // Add any other reservation data you need here
            })
            .then((reservationDocRef) => {
              // Call the addRestaurant function to update the screen
              addRestaurantToScreen({
                id: restaurantDocRef.id,
                name: restaurant.name,
                description: restaurant.description,
                image: restaurant.image,
                location: restaurant.location,
              });

              // Optionally, you can also add the reservation data to the reservations list
              // in the current screen by calling a function like addReservationToList(reservationData);
            })
            .catch((reservationError) => {
              console.error('Error adding reservation to Firestore:', reservationError);
            });
        })
        .catch((restaurantError) => {
          console.error('Error adding restaurant to Firestore:', restaurantError);
        });
    } else {
      console.error('Invalid restaurant data:', restaurant);
    }
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
});

export default RestaurantScreen;
