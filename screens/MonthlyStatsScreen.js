import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock data for monthly booking statistics (you will replace this with real data)
const mockMonthlyStats = [
  { month: 'January', bookings: 200 },
  { month: 'February', bookings: 220 },
  { month: 'March', bookings: 240 },
  { month: 'April', bookings: 280 },
  { month: 'May', bookings: 320 },
  { month: 'June', bookings: 350 }, 
  // Add data for other months
];

const MonthlyStatsScreen = () => {
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Access the navigation object

  useEffect(() => {
    // Simulate fetching data (replace this with your data fetching logic)
    setTimeout(() => {
      setMonthlyStats(mockMonthlyStats);
      setIsLoading(false);
    }, 1500); // Simulating a delay for loading data
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Booking Statistics</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <FlatList
            data={monthlyStats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.statItem}>
                <Text style={styles.month}>{item.month}</Text>
                <Text style={styles.bookings}>{item.bookings} Bookings</Text>
              </View>
            )}
          />
          {/* Add a button to navigate back to the Admin Screen */}
          <Button title="Back to Admin" onPress={() => navigation.goBack()} />
        </ScrollView>
      )}
    </View>
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
  month: {
    fontSize: 16,
  },
  bookings: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MonthlyStatsScreen;
