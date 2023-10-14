import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { firebase } from "../config";

const MonthlyStatsScreen = () => {
 const [stats, setStats] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const snapshot = await firestore().collection('reservations')
        .where('date', '>=', firstDayOfMonth)
        .where('date', '<=', lastDayOfMonth)
        .get();

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStats(data);
    };

    fetchData();
 }, []);

 const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date.toDateString()}</Text>
    </View>
 );

 return (
    <View style={styles.container}>
      <Text style={styles.header}>Monthly Stats</Text>
      <FlatList
        data={stats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
 },
 header: {
    fontSize: 24,
    fontWeight: 'bold',
 },
 item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
 },
 title: {
    fontSize: 18,
    fontWeight: 'bold',
 },
 date: {
    fontSize: 14,
    color: 'gray',
 },
});

export default MonthlyStatsScreen;