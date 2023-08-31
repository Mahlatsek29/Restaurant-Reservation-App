import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native'; // Add TextInput import
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = ({ selectedDate, onDateChange, showDatePicker, setShowDatePicker }) => {
  const onInternalDateChange = (event, selected) => {
    if (selected) {
      onDateChange(selected);
    }
    setShowDatePicker(false);
  };

  return (
    <View>
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display=""
          onChange={onInternalDateChange}
        />
      )}
      <Text>Selected Date: {selectedDate.toDateString()}</Text>
    </View>
  );
};

const MakeReservationScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    navigation.navigate('Confirmation', { date, time, guests });
  };

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Make a Reservation</Text>
      <MyDatePicker
        selectedDate={date}
        onDateChange={handleDateChange}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        value={guests}
        onChangeText={setGuests}
      />
      <Button title="Submit Reservation" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default MakeReservationScreen;
