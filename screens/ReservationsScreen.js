import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import images from "../components/images";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ReservationScreen = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState("");

  const navigation = useNavigation();

  const {
    selectedRestaurantName,
    selectedRestaurantDescription,
    selectedRestaurantImage,
    selectedRestaurantLocation,
  } = route.params;

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    navigation.navigate("MakeReservation", {
      selectedRestaurantName,
      selectedRestaurantDescription,
      selectedRestaurantImage,
      selectedRestaurantLocation,
      selectedDate,
      selectedTime,
      numberOfGuests,
    });
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date.toISOString().slice(0, 10)); // Format the date as needed
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    setSelectedTime(time.toLocaleTimeString()); // Format the time as needed
  };

  const handleIncrementGuests = () => {
    setNumberOfGuests((prevGuests) => (prevGuests === "" ? 1 : prevGuests + 1));
  };

  const handleDecrementGuests = () => {
    setNumberOfGuests((prevGuests) => (prevGuests === "" || prevGuests === 0 ? "" : prevGuests - 1));
  };

  return (
    <View style={styles.container}>
      <Image source={images[selectedRestaurantImage]} style={styles.restaurantImage} />
      <Text style={styles.whiteText}>{selectedRestaurantName}</Text>
      <Text style={styles.whiteText}>{selectedRestaurantDescription}</Text>
      <Text style={styles.whiteText}>{selectedRestaurantLocation}</Text>

      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <AntDesign name="arrowleft" size={20} color="black" />
        <Text style={styles.blackButtonText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showDatePicker} style={styles.calendarButton}>
        <Text style={styles.calendarButtonText}>Select Date: {selectedDate || "Pick a date"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity onPress={showTimePicker} style={styles.calendarButton}>
        <Text style={styles.calendarButtonText}>Select Time: {selectedTime || "Pick a time"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <View style={styles.guestsContainer}>
        <Text style={styles.guestsLabel}>Number of Guests:</Text>
        <View style={styles.guestsControls}>
          <TouchableOpacity onPress={handleDecrementGuests} style={styles.guestControlButton}>
            <Text style={styles.guestControlText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.guestInputField}
            placeholder="0"
            keyboardType="numeric"
            value={numberOfGuests.toString()}
            onChangeText={setNumberOfGuests}
          />
          <TouchableOpacity onPress={handleIncrementGuests} style={styles.guestControlButton}>
            <Text style={styles.guestControlText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.reservationButton} onPress={handleSubmit}>
        <Text style={styles.reservationButtonText}>Make Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  restaurantImage: {
    width: "90%",
    height: 250,
    marginBottom: 10,
  },
  whiteText: {
    color: "white",
    marginBottom: 5,
  },
  backButton: {
    position: "absolute",
    top: 75,
    left: 40,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 25,
  },
  blackButtonText: {
    color: "black",
    textAlign: "center",
  },
  calendarButton: {
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  calendarButtonText: {
    color: "black",
    textAlign: "center",
  },
  guestsContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  guestsLabel: {
    color: "white",
    marginRight: 10,
  },
  guestsControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  guestControlButton: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  guestControlText: {
    color: "black",
    fontSize: 18,
  },
  guestInputField: {
    backgroundColor: "white",
    width: 40,
    padding: 5,
    textAlign: "center",
    borderRadius: 3,
    color: "white",
  },
  reservationButton: {
    marginTop: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  reservationButtonText: {
    color: "black",
    textAlign: "center",
    borderRadius: 25,
  },
});

export default ReservationScreen;
