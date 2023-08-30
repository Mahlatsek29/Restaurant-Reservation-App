import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = ({ selectedDate, onDateChange, showDatePicker, setShowDatePicker }) => {
  const onInternalDateChange = (event, selected) => {
    if (selected) {
      onDateChange(selected);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onInternalDateChange}
        />
      )}
      <Text>Selected Date: {selectedDate.toDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyDatePicker;
