import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firestore } from '@react-native-firebase/firestore';

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Fetch bookings from Firestore
    const fetchBookings = async () => {
      try {
        const bookingsCollection = firestore().collection('bookings');
        const snapshot = await bookingsCollection.get();
        const bookingData = snapshot.docs.map((doc) => doc.data());
        setBookings(bookingData);

        // Calculate weekly stats
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weeklyBookings = bookingData.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate >= oneWeekAgo && bookingDate <= today;
        });
        const totalBookings = weeklyBookings.length;
        const totalRevenue = weeklyBookings.reduce(
          (acc, booking) => acc + booking.price,
          0
        );
        setWeeklyStats({ totalBookings, totalRevenue });
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Booking Statistics</Text>
      <View style={styles.statsContainer}>
        <Text>Total Bookings: {weeklyStats.totalBookings}</Text>
        <Text>Total Revenue: ${weeklyStats.totalRevenue.toFixed(2)}</Text>
      </View>
      <Text style={styles.screenTitle}>Weekly Stats</Text>
      <FlatList
        data={bookings}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text>Booking Date: {item.date}</Text>
            <Text>Price: ${item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  statsContainer: {
    marginBottom: 20,
  },
  bookingItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default BookingScreen;
