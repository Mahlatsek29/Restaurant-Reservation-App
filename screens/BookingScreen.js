import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Mock data for weekly booking statistics (you will replace this with real data)
const mockWeeklyStats = [
  { day: 'Mon', bookings: 20 },
  { day: 'Tue', bookings: 18 },
  { day: 'Wed', bookings: 25 },
  { day: 'Thu', bookings: 22 },
  { day: 'Fri', bookings: 30 },
  { day: 'Sat', bookings: 35 },
  { day: 'Sun', bookings: 28 },
];

const BookingScreen = () => {
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    // Simulate fetching data (replace this with your data fetching logic)
    setTimeout(() => {
      setWeeklyStats(mockWeeklyStats);
      setIsLoading(false);
    }, 1500); // Simulating a delay for loading data
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weekly Booking Statistics</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={weeklyStats}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.statItem}>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.bookings}>{item.bookings} Bookings</Text>
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
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  day: {
    fontSize: 16,
  },
  bookings: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
