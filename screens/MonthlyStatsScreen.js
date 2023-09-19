import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../config"; // Import your Firebase configuration
import { useNavigation } from "@react-navigation/native";

const MonthlyStatsScreen = () => {
  const [monthlyStats, setMonthlyStats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        const year = 2023; // Specify the year you want to analyze
        const monthlyStats = [];

        for (let month = 0; month < 12; month++) {
          const startDate = new Date(year, month, 1);
          const endDate = new Date(year, month + 1, 0);

          const reservationsSnapshot = await firebase
            .firestore()
            .collection("reservations")
            .where("date", ">=", startDate)
            .where("date", "<=", endDate)
            .get();

          const monthlyTotal = reservationsSnapshot.size;

          monthlyStats.push({
            month: month + 1, // Month index starts from 0, so we add 1
            year,
            totalReservations: monthlyTotal,
          });
        }

        setMonthlyStats(monthlyStats);
      } catch (error) {
        console.error("Error fetching monthly statistics:", error);
      }
    };

    fetchMonthlyStats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monthly Reservation Statistics</Text>
      <FlatList
        data={monthlyStats}
        keyExtractor={(item) => `${item.year}-${item.month}`}
        renderItem={({ item }) => (
          <View style={styles.monthlyStatItem}>
            <Text>{`${item.year}-${item.month}`}</Text>
            <Text>Total Reservations: {item.totalReservations}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Navigate back to the previous screen
      >
        <Text style={styles.backButtonText}>Back to Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  monthlyStatItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    bottom: 20, // Position at the bottom of the screen
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});

export default MonthlyStatsScreen;
