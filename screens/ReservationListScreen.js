import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config'; 
import images from '../components/images';

const ReservationListScreen = () => {
  const navigation = useNavigation();
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const firestore = firebase.firestore();
    
    firestore.collection('restaurants').onSnapshot((snapshot) => {
      const restaurants = [];
      snapshot.forEach((doc) => {
        restaurants.push({ id: doc.id, ...doc.data() });
      });
      setRestaurantList(restaurants);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {restaurantList.map((restaurant) => (
          <View style={styles.col} key={restaurant.id}>
            <View style={styles.card}>
              <Image source={images[restaurant.image]} style={styles.cardImgTop} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{restaurant.name}</Text>
                <Text style={styles.cardText}>{restaurant.location}</Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    navigation.navigate('ReservationsScreen', {
                      selectedRestaurantName: restaurant.name,
                      selectedRestaurantDescription: restaurant.description,
                      selectedRestaurantImage: restaurant.image,
                      selectedRestaurantLocation: restaurant.location,
                    })
                  }
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  col: {
    flexBasis: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImgTop: {
    width: '100%',
    height: 200,
    borderWidth: 1,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
  },
  viewButton: {
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ReservationListScreen;