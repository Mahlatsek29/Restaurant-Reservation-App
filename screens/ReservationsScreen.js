import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import images from "../components/images";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "../config";

const db = firebase.firestore();

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

  const storeReservationData = () => {
    db.collection("reservations")
      .add({
        restaurantName: selectedRestaurantName,
        date: selectedDate,
        time: selectedTime,
        numberOfGuests: parseInt(numberOfGuests),
      })
      .then(() => {
        console.log("Reservation data stored successfully!");
      })
      .catch((error) => {
        console.error("Error storing reservation data:", error);
      });
  };

  const handleSubmit = () => {
    storeReservationData();
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
    setSelectedDate(date.toISOString().slice(0, 10));
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    setSelectedTime(time.toLocaleTimeString());
  };

  const handleIncrementGuests = () => {
    setNumberOfGuests((prevGuests) =>
      prevGuests === "" ? 1 : parseInt(prevGuests) + 1
    );
  };

  const handleDecrementGuests = () => {
    setNumberOfGuests((prevGuests) =>
      prevGuests === "" || prevGuests === 0 ? "" : parseInt(prevGuests) - 1
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <AntDesign name="arrowleft" size={20} color="white" />
        <Text style={styles.whiteButtonText}>Back</Text>
      </TouchableOpacity>

      <Image
        source={images[selectedRestaurantImage]}
        style={styles.restaurantImage}
      />
      <Text style={styles.whiteText}>{selectedRestaurantName}</Text>
      <Text style={styles.whiteText}>{selectedRestaurantDescription}</Text>
      <Text style={styles.whiteText}>{selectedRestaurantLocation}</Text>

      <TouchableOpacity onPress={showDatePicker} style={styles.calendarButton}>
        <Text style={styles.calendarButtonText}>
          Select Date: {selectedDate || "Pick a date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="Pick a Date"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
        date={new Date()}
        modalStyle={styles.datePickerModal}
        pickerContainerStyleIOS={styles.datePickerContainer}
      />

      <TouchableOpacity onPress={showTimePicker} style={styles.calendarButton}>
        <Text style={styles.calendarButtonText}>
          Select Time: {selectedTime || "Pick a time"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        headerTextIOS="Pick a Time"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
        date={new Date()}
        modalStyle={styles.timePickerModal}
        pickerContainerStyleIOS={styles.timePickerContainer}
      />

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
          onChangeText={(text) => setNumberOfGuests(text)}
        />
        <TouchableOpacity onPress={handleIncrementGuests} style={styles.guestControlButton}>
          <Text style={styles.guestControlText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.reservationButton}
        onPress={handleSubmit} 
      >
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
    backgroundColor: "black",
    borderRadius: 25,
  },
  whiteButtonText: {
    color: "white",
    marginLeft: 5,
  },
  calendarButton: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  calendarButtonText: {
    color: "white",
    textAlign: "center",
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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  guestControlText: {
    color: "white",
    fontSize: 18,
  },
  guestInputField: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 40,
    padding: 5,
    textAlign: "center",
    borderRadius: 3,
    color: "white",
  },
  reservationButton: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  reservationButtonText: {
    color: "white",
    textAlign: "center",
  },
  datePickerModal: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  datePickerContainer: {
    backgroundColor: "black",
  },
  timePickerModal: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  timePickerContainer: {
    backgroundColor: "black",
  },
});

export default ReservationScreen;
