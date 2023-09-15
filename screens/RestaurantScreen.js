import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRestaurantName, setNewRestaurantName] = useState(''); // State to store the new restaurant name

  // Dummy data for demonstration
  const initialRestaurants = [
    { id: '1', name: 'Restaurant 1' },
    { id: '2', name: 'Restaurant 2' },
    // Add more initial data here
  ];

  useEffect(() => {
    // Simulate fetching restaurant data (you can replace this with an API call)
    setTimeout(() => {
      setRestaurants(initialRestaurants);
      setLoading(false);
    }, 2000); // Simulating a delay

    // This useEffect will run once, similar to componentDidMount
  }, []);

  const deleteRestaurant = (id) => {
    // Simulate deleting a restaurant (you can replace this with actual deletion logic)
    const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
    setRestaurants(updatedRestaurants);
  };

  const addRestaurant = () => {
    // Create a new restaurant object with a unique ID
    const newRestaurant = {
      id: (restaurants.length + 1).toString(),
      name: newRestaurantName,
    };

    // Add the new restaurant to the list
    setRestaurants([...restaurants, newRestaurant]);

    // Clear the input field
    setNewRestaurantName('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.restaurantItem}>
      <Text style={styles.restaurantName}>{item.name}</Text>
      {/* Display other restaurant details */}
      <Button title="Delete" onPress={() => deleteRestaurant(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Restaurant List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new restaurant name"
        value={newRestaurantName}
        onChangeText={(text) => setNewRestaurantName(text)}
      />
      <Button title="Add Restaurant" onPress={addRestaurant} />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restaurantItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default RestaurantScreen;
