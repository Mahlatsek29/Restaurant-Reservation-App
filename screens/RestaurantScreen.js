import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../config';
import images from '../components/images';
import { useNavigation } from '@react-navigation/native';

function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

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
    
  };

  const deleteRestaurant = (restaurantId) => {
    const firestore = firebase.firestore();
    firestore.collection('restaurants').doc(restaurantId).delete()
      .then(() => {

      })
      .catch((error) => {
        console.error('Error deleting restaurant:', error);
      });
  };

 const navigateToEditScreen = (restaurant) => {
  navigation.navigate('Edit', {
    restaurant,
    onSave: handleEditRestaurant,
  });
};

  const handleEditRestaurant = (editedRestaurant) => {
    const updatedRestaurants = restaurants.map((r) => {
      if (r.id === editedRestaurant.id) {
        return editedRestaurant;
      } else {
        return r;
      }
    });
    setRestaurants(updatedRestaurants);
  };

  const handleBackToAdmin = () => {
    navigation.navigate('Admin');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {restaurants.map((restaurant) => (
          <View key={restaurant.id} style={styles.card}>
            <Image style={styles.image} source={images[restaurant.image]} />
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
            <Text style={styles.location}>{restaurant.location}</Text>
            <Button title="Add to Reservations" onPress={() => addRestaurantToFirestore(restaurant)} />
            <Button title="Edit" onPress={() => navigateToEditScreen(restaurant)} />
            <Button title="Delete" onPress={() => deleteRestaurant(restaurant.id)} />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToAdmin}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
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
