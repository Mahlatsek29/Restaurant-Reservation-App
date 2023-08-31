import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfirmationScreen  = ({ route }) => {
  const { date, time, guests } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservation Confirmation</Text>
      <Text>Your reservation has been confirmed!</Text>
      <Text>Date: {date}</Text>
      <Text>Time: {time}</Text>
      <Text>Guests: {guests}</Text>
      <Text>Thank you for choosing us!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default ConfirmationScreen;