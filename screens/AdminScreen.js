import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [bookingStats, setBookingStats] = useState({ weeklyStats: 0, monthlyStats: 0 });
  const [showRestaurantList, setShowRestaurantList] = useState(false); 

  const addRestaurant = () => {
    if (restaurantName.trim() === '') {
      return;
    }

    const newRestaurant = {
      id: Math.random().toString(),
      name: restaurantName,
    };

    setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);
    setRestaurantName('');
  };

  const editRestaurant = (restaurantId, updatedDetails) => {
  
  };

  const deleteRestaurant = (restaurantId) => {

  };

  const viewBookings = (restaurantId) => {
    
    console.log(`View bookings for restaurant with ID: ${restaurantId}`);
  };

  const generateBookingStatistics = () => {

    const calculatedStats = {
      weeklyStats: 50, 
      monthlyStats: 200,
    };
    setBookingStats(calculatedStats);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Listing Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter restaurant name"
        value={restaurantName}
        onChangeText={(text) => setRestaurantName(text)}
      />
      <Button title="Add Restaurant" onPress={addRestaurant} />
      
      <Button
        title="View Restaurants"
        onPress={() => setShowRestaurantList(true)}
      />

      <FlatList
        data={restaurants}
        keyExtractor={(restaurant) => restaurant.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Icon.Button
              name="edit" 
              backgroundColor="black"
              onPress={() => editRestaurant(item.id, { name: 'Updated Name' })}
            >
              Edit
            </Icon.Button>
            <Icon.Button
              name="trash" 
              backgroundColor="black"
              onPress={() => deleteRestaurant(item.id)}
            >
              Delete
            </Icon.Button>
            <Icon.Button
              name="eye" 
              backgroundColor="black"
              onPress={() => viewBookings(item.id)}
            >
              View Bookings
            </Icon.Button>
          </View>
        )}
      />

      <Text style={styles.title}>Booking Statistics</Text>
      <Button title="Generate Weekly Stats" onPress={generateBookingStatistics} />
      <Button title="Generate Monthly Stats" onPress={generateBookingStatistics} />
      <Text>Weekly Stats: {bookingStats.weeklyStats}</Text>
      <Text>Monthly Stats: {bookingStats.monthlyStats}</Text>

      {/* Modal to display the list of restaurants */}
      <Modal
        visible={showRestaurantList}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>List of Restaurants</Text>
          <FlatList
            data={restaurants}
            keyExtractor={(restaurant) => restaurant.id}
            renderItem={({ item }) => (
              <View style={styles.modalItem}>
                <Text>{item.name}</Text>
              </View>
            )}
          />
          <Button title="Close" onPress={() => setShowRestaurantList(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AdminScreen;
