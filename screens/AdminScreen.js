import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [bookingStats, setBookingStats] = useState({ weeklyStats: 0, monthlyStats: 0 });
  const [showRestaurantList, setShowRestaurantList] = useState(false); // To control the visibility of the restaurant list modal

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

  // Placeholder functions for edit, delete, and view bookings
  const editRestaurant = (restaurantId, updatedDetails) => {
    // Implement edit logic here
  };

  const deleteRestaurant = (restaurantId) => {
    // Implement delete logic here
  };

  const viewBookings = (restaurantId) => {
    // Implement code to view bookings for the selected restaurant
    // You can navigate to a new screen or show a modal to display bookings.
    // For simplicity, let's just log the selected restaurant's ID for now.
    console.log(`View bookings for restaurant with ID: ${restaurantId}`);
  };

  const generateBookingStatistics = () => {
    // Implement your logic to calculate weeklyStats and monthlyStats here
    // For demonstration purposes, let's set some dummy values.
    const calculatedStats = {
      weeklyStats: 50, // Replace with your calculation
      monthlyStats: 200, // Replace with your calculation
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
      
      {/* Button to open the restaurant list modal */}
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
              name="edit" // Replace with the name of the FontAwesome icon you want to use
              backgroundColor="black"
              onPress={() => editRestaurant(item.id, { name: 'Updated Name' })}
            >
              Edit
            </Icon.Button>
            <Icon.Button
              name="trash" // Replace with the name of the FontAwesome icon for delete
              backgroundColor="black"
              onPress={() => deleteRestaurant(item.id)}
            >
              Delete
            </Icon.Button>
            <Icon.Button
              name="eye" // Replace with the name of the FontAwesome icon for view
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
