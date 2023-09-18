import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock data for customer arrivals (you will replace this with real data)
const mockArrivalsData = [
  { reservationId: '12345', customerName: 'John Doe', arrivalTime: '15:30' },
  { reservationId: '67890', customerName: 'Jane Smith', arrivalTime: '18:15' },
  // Add data for other arrivals
];

const ArrivalsScreen = () => {
  const [arrivalsData, setArrivalsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Access the navigation object

  useEffect(() => {
    // Simulate fetching data (replace this with your data fetching logic)
    setTimeout(() => {
      setArrivalsData(mockArrivalsData);
      setIsLoading(false);
    }, 1500); // Simulating a delay for loading data
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Customer Arrivals</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={arrivalsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.arrivalItem}>
              <Text style={styles.reservationId}>Reservation ID: {item.reservationId}</Text>
              <Text style={styles.customerName}>Customer Name: {item.customerName}</Text>
              <Text style={styles.arrivalTime}>Arrival Time: {item.arrivalTime}</Text>
            </View>
          )}
        />
      )}
      {/* Add a button to navigate back to the Admin Screen */}
      <Button title="Back to Admin" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  arrivalItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  reservationId: {
    fontSize: 16,
  },
  customerName: {
    fontSize: 16,
  },
  arrivalTime: {
    fontSize: 16,
  },
});

export default ArrivalsScreen;
