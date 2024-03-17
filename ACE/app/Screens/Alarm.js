import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Calendar from "expo-calendar";

import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import {
  getStoredCalendarId,
  createCalendar,
  storeCalenderId,
} from "../Modules/CalendarManager";

import { colors } from "../colors";

const Event = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  //const [selectedTimeReminder, setSelectedTimeReminder] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    if (Platform.OS !== "ios") {
      setShowDatePicker(false); // Automatically hide date picker on Android after selection
    }
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
    if (Platform.OS !== "ios") {
      setShowTimePicker(false); // Automatically hide time picker on Android after selection
    }
  };

  const [selectedTime, setSelectedTime] = useState(null);

  const handleSetReminder = (time) => {
    setSelectedTime(time);
    // Add the logic to actually set the reminder here
  };

  const isSelected = (time) => {
    return selectedTime === time;
  };

  const handleSelectIntensity = (intensity) => {
    setSelectedIntensity(intensity);
  };

  const [repeat, setRepeat] = useState("Daily");
  const [snooze, setSnooze] = useState("10 Minutes");

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          calendars.EntityTypes.EVENT,
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  const addNewEvent = async () => {
    try {
      let calendarId = await getStoredCalendarId();
      // Attempt to create the event
      const res = await Calendar.createEventAsync(calendarId, {
        title: eventTitle,
        startDate: date,

        alarms: [{ absoluteDate: Date.now() }],
        endDate: new Date(date.getTime() + 60 * 60 * 1000), // 1 hour after the start date
      });
      console.log("Event Created!", res);
      alert("Event Created!");
      router.back();
    } catch (e) {
      console.log(e);
      if (e.message.includes("could not be found")) {
        // If the error is because the calendar couldn't be found,
        // clear the stored ID and try creating a new calendar.
        try {
          await AsyncStorage.removeItem("ACE_Calendar");
          const newCalendarId = await createCalendar();
          await storeCalenderId(newCalendarId);
          // Optionally, retry creating the event with the new calendar ID here
        } catch (error) {
          console.error("Failed to reset calendar ID:", error);
        }
      } else {
        // Handle other errors
        alert("Failed to create event. Please try again.");
      }
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Alarm</Text>
          <StatusBar style="auto" />

          <View style={styles.Main}>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#bdbebf"
              style={styles.Input}
              editable={true}
              onChangeText={setEventTitle}
            />
          </View>

          <View style={styles.dateChangeContainer}>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.changeButton}
            >
              <Text style={styles.changeButtonText}>Add Date</Text>
            </TouchableOpacity>
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </View>

          <View style={styles.timeChangeContainer}>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.changeButton}
            >
              <Text style={styles.changeButtonText}>Add Time</Text>
            </TouchableOpacity>
            <Text style={styles.timeText}>{time.toLocaleTimeString()}</Text>
          </View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
          <View style={styles.pickerContainer}>
            <Text style={styles.repeatText}>Reminder :</Text>
            <Picker
              selectedValue={repeat}
              onValueChange={(itemValue, itemIndex) => setRepeat(itemValue)}
              style={styles.picker}
              dropdownIconColor={"white"}
              mode="dropdown" // Android only
            >
              {/* <Picker.Item label="None" value="none" /> */}
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Yearly" value="yearly" />
            </Picker>
          </View>

          <View style={styles.row}>
            <Text style={styles.labelText}>Snooze:</Text>
            <Picker
              selectedValue={snooze}
              onValueChange={(itemValue, itemIndex) => setSnooze(itemValue)}
              style={styles.picker}
              dropdownIconColor={"white"}
              mode="dropdown" // Android only
            >
              <Picker.Item label="5 Minutes" value="5" />
              <Picker.Item label="10 Minutes" value="10" />
              <Picker.Item label="15 Minutes" value="15" />
              <Picker.Item label="20 Minutes" value="20" />
              {/* Add more options as needed */}
            </Picker>
          </View>

          <Text style={styles.notificationintencity}>
            Notification Intencity:
          </Text>
          <View style={styles.notificationButtonContainer}>
            <TouchableOpacity
              onPress={() => handleSelectIntensity("volume-down")}
              style={[
                styles.notificationButton2,
                selectedIntensity === "volume-down" &&
                  styles.selectedIntensityButton,
              ]}
            >
              <FontAwesome5
                name="volume-down"
                style={styles.notificationIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSelectIntensity("volume-up")}
              style={[
                styles.notificationButton2,
                selectedIntensity === "volume-up" &&
                  styles.selectedIntensityButton,
              ]}
            >
              <FontAwesome5 name="volume-up" style={styles.notificationIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSelectIntensity("microphone-settings")}
              style={[
                styles.notificationButton2,
                selectedIntensity === "microphone-settings" &&
                  styles.selectedIntensityButton,
              ]}
            >
              <MaterialCommunityIcons
                name="microphone-settings"
                style={styles.notificationIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.actionButtonContainer}>
            {/* Delete Reminder Button */}
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete Event</Text>
            </TouchableOpacity>

            {/* Save Changes Button */}
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.actionButtonText} onPress={addNewEvent}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginTop: -30,
    alignSelf: "flex-start",
    marginLeft: 90,
  },
  Main: {
    backgroundColor: "#151515",
    width: 400,
    height: 60,
    borderWidth: 2,
    borderColor: "#2A2A2A",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    marginTop: 20,
    flexDirection: "row", // This ensures the TextInput and Icon are in the same row
    justifyContent: "space-between", // This spreads out the TextInput and Icon within the container
    alignItems: "center",
  },
  // Input:{
  //     flex : 1,
  //     marginLeft:15,
  //     fontSize:20,
  //     color:'#fff'
  // },
  Input: {
    flex: 1,
    marginLeft: 15,
    marginTop: 0,
    fontSize: 20,
    color: "#fff",
    minHeight: 40, // Ensure this is high enough for easy tapping
  },
  Main1: {
    backgroundColor: "#151515",
    width: 400,
    height: 130,
    marginTop: 25,
    borderWidth: 2,
    borderColor: "#2A2A2A",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
  },
  Input1: {
    flex: 1,
    marginLeft: 15,
    marginTop: -10,
    fontSize: 25,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  changeButton: {
    backgroundColor: "#d1630c", // Button color
    paddingVertical: 15, // Increases height
    paddingHorizontal: 20, // Increases width
    borderRadius: 20, // Higher value for more pronounced curves
    marginHorizontal: 35, // Adjust if needed to maintain gap between buttons
    width: 150, // You can adjust this as needed
    marginHorizontal: 5, // Adjust the spacing from the sides if needed
    marginTop: 10,
  },
  changeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold", // Make the text bold
    fontSize: 19,
  },
  dateTimeContainer: {
    flexDirection: "row", // Align items in a row
    justifyContent: "center", // Center the items horizontally
    marginTop: 30, // Space from the top or previous element
  },

  dateText: {
    color: "#fff",
    fontSize: 30,
    marginRight: 70, // Adjust the gap between the date and time by changing this value
    flex: 1, // Take up the remaining space
    textAlign: "right", // Align the text to the right
    marginTop: 16,
  },

  timeText: {
    color: "#fff",
    fontSize: 30,
    marginRight: 50,
    // Add marginLeft if you need more space on the left side as well
    flex: 1, // Take up the remaining space
    textAlign: "right", // Align the text to the right
    marginTop: 12,
  },
  remindText: {
    fontSize: 24,
    color: "#fff",
    marginTop: 15, // Space from the microphone icon
    alignSelf: "flex-start", // Align to the start of the flex container
    marginLeft: 20, // Match the left margin of the title
  },
  timeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // This will space your buttons evenly
    width: "100%", // Use the full width of the container for even spacing
    marginTop: 20, // Space from the "Remind in:" text
    fontWeight: "bold",
  },
  timeButton: {
    backgroundColor: "#D2630F", // Orange background for the buttons
    borderRadius: 45, // Corrected borderRadius to make it a circle
    width: 90, // Width of the button
    height: 90, // Height of the button, same as width for circle shape
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  timeButtonText: {
    color: "#fff", // White text color
    fontSize: 18, // Font size for the button text
  },
  notificationButton: {
    backgroundColor: "#D2630F", // Orange background for the buttons
    borderRadius: 25, // This should be half the width and height
    width: 50, // Width of the button
    height: 50, // Height of the button, should be the same as the width for a circle
    justifyContent: "center", // Center the icon vertically
    alignItems: "center", // Center the icon horizontally
    marginHorizontal: 10, // Add some horizontal margin if needed
  },
  notificationIcon: {
    color: "#fff", // White icon color
    fontSize: 24, // Icon size
  },
  notificationintencity: {
    fontSize: 22,
    color: "#fff",
    marginTop: 38, // Space from the microphone icon
    alignSelf: "flex-start", // Align to the start of the flex container
    marginLeft: 20, // Match the left margin of the title
  },
  notificationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  notificationButton2: {
    backgroundColor: "#D2630F", // Orange background for the buttons
    borderRadius: 35, // This should be half the width and height for a perfect circle
    width: 80, // Increased width of the button for a larger size
    height: 80, // Increased height of the button for a larger size
    justifyContent: "center", // Center the icon vertically
    alignItems: "center", // Center the icon horizontally
    marginHorizontal: 30, // Add some horizontal margin if needed
  },

  notificationIcon: {
    color: "#fff", // White icon color
    fontSize: 30, // Increased icon size
  },
  // Styles for the action buttons at the bottom of the screen
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  deleteButton: {
    backgroundColor: "#fff", // White background for the delete button
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    textAlign: "center",
    flex: 1,
  },

  deleteButtonText: {
    color: "#000", // Black text color for the delete button
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
  },

  saveButton: {
    backgroundColor: "#D2630F", // Orange background for the save button
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    flex: 1,
  },

  actionButtonText: {
    color: "#fff", // White text color for the save button
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  selectedTimeButton: {
    borderColor: "#ffff", // This will be the color of the outline
    borderWidth: 4, // This sets the thickness of the outline
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // Match the background color with the rest of your app
  },
  selectedIntensityButton: {
    borderColor: "white",
    borderWidth: 3,
    // any other style adjustments
  },
  locationIconContainer: {
    marginRight: 15, // Spacing to the right of the icon
  },
  locationIcon: {
    fontSize: 24, // Size of the location icon
    color: "#FEFEFE", // Color of the location icon, assumed to be white
  },
  dateChangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10, // Adjust padding as needed
  },

  timeChangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10, // Adjust padding as needed
  },
  // pickerContainer: {
  //   backgroundColor: '#151515',
  //   width: '100%',
  //   marginVertical: 10,
  // },
  // picker: {
  //   color: 'white',
  //   width: '100%',
  // },
  pickerContainer: {
    flexDirection: "row", // Align children side by side
    alignItems: "center", // Center children vertically
    justifyContent: "space-between", // Add space between the text and the picker
    backgroundColor: "#151515",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10, // Add some padding horizontally
  },

  picker: {
    color: "white",
    flex: 1, // Picker will fill the rest of the horizontal space
  },
  repeatText: {
    fontSize: 24,
    color: "#fff",
    marginTop: 10,
    alignSelf: "flex-start", // Align to the start of the flex container
    marginLeft: 20, // Match the left margin of the title
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#151515",
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10, // Adjust the padding as needed
  },
  labelText: {
    color: "#fff",
    fontSize: 18, // Adjust the size as needed
    marginRight: 10, // Add some margin to the right of the text
  },
  picker: {
    color: "white",
    flex: 1, // Allows the picker to grow and fill the available space
    // Additional picker styles if needed
  },
});
