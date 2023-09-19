import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Restaurant from '../screens/RestaurantScreen'; // Import your Restaurant component

function ParentComponent() {
  // Define a state or data structure to store reservations
  const [reservations, setReservations] = useState([]);

  // Define a function to add a restaurant to reservations
  const addRestaurantToReservations = (restaurant) => {
    setReservations([...reservations, restaurant]);
  };

  return (
    <View style={styles.container}>
      {/* Pass the addRestaurantToReservations function as a prop */}
      <Restaurant addRestaurant={addRestaurantToReservations} />
      {/* Render your reservation list or use it as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ParentComponent;
