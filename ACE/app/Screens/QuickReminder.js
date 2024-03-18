/*Quick Reminder Screen*/
import { StatusBar } from "expo-status-bar";
import { Router } from "expo-router";
//import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
import * as Calendar from "expo-calendar";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  getStoredCalendarId,
  createCalendar,
} from "../Modules/CalendarManager";

import AsyncStorage from "@react-native-async-storage/async-storage";
import useTheme from "../Hooks/useTheme";

const QuickReminder = () => {
  const [title, setTitle] = useState(""); // State for the reminder title
  const [description, setDescription] = useState(""); // State for the reminder description
  const [selectedTime, setSelectedTime] = useState(null);
  const { color: colors } = useTheme();

  const handleSetReminder = async () => {
    // setSelectedTime(time);
    // Add the logic to actually set the reminder here
    await AsyncStorage.setItem(
      "reminder",
      JSON.stringify({ description, selectedTime }),
    );

    //Shedule local notification
    PushNotification.localNotificationSchedule({
      title: "Reminder",
      message: description,
      date: new Date(Date.now() + 1000 * 60 * 1), // 1 minutes from now
    });
  };
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
  const addnewReminder = async () => {
    try {
      let calendarId = await getStoredCalendarId();
      const res = await Calendar.createEventAsync(calendarId, {
        title: "Quick Reminder",
        description: description,
        startDate: new Date(),
        endDate: new Date(),
        alarms: selectedTime ? [{ relativeOffset: selectedTime }] : [],
      });
      alert("Event added successfully");
      router.back();
    } catch (e) {
      console.log(e);
    }
  };
  const isSelected = (time) => {
    return selectedTime === time;
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.chevcolor}]}>Quick Reminder</Text>
      <StatusBar style="auto" />
      <View style={[styles.Main, {backgroundColor: colors.descback}]}>
        <TextInput
          placeholder="Brief Description...       "
          placeholderTextColor= {colors.chevcolor}
          style={styles.Input}
        ></TextInput>
      </View>
      {/* <TouchableOpacity>
        <FontAwesome5
          style={styles.icon}
          name="microphone-alt"
          size={40}
          marginTop={30}
          marginLeft={-90}
        />
      </TouchableOpacity> */}
      <Text style={[styles.remindText, {color: colors.chevcolor}]}>Remind in:</Text>
      <View style={styles.timeButtonContainer}>
        {["15 min", "30 min", "1 hour"].map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              isSelected(time) && styles.selectedTimeButton, {backgroundColor: colors.buttoncolor} // Add the selected style conditionally
            ]}
            onPress={() => handleSetReminder(time)}
          >
            <Text style={[styles.timeButtonText, {color: colors.textcolor}]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.notificationintencitytext, {color: colors.chevcolor}]}>
        Notification Intensity:
      </Text>
      <View style={styles.notificationButtonContainer}>
        {/* Low Volume Button */}
        <TouchableOpacity style={[styles.notificationButton2, {backgroundColor: colors.buttoncolor}]}>
          <FontAwesome5 name="volume-down" style={styles.notificationIcon} />
        </TouchableOpacity>

        {/* High Volume Button */}
        <TouchableOpacity style={[styles.notificationButton2, {backgroundColor: colors.buttoncolor}]}>
          <FontAwesome5 name="volume-up" style={styles.notificationIcon} />
        </TouchableOpacity>

        {/* Microphone Settings Button */}
        <TouchableOpacity style={[styles.notificationButton2, {backgroundColor: colors.buttoncolor}]}>
          <MaterialCommunityIcons
            name="microphone-settings"
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtonContainer}>
        {/* Delete Reminder Button */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete Reminder</Text>
        </TouchableOpacity>

        {/* Save Changes Button */}
        <TouchableOpacity style={[styles.saveButton, {backgroundColor: colors.buttoncolor}]} onPress={handleSetReminder}>
          <Text style={styles.actionButtonText} onPress={addnewReminder}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default QuickReminder;
const styles = StyleSheet.create({
  title: {
    fontSize: 50, // Assuming a larger font size for the title
    fontWeight: "bold", // Assuming the title is bold
    color: "#fff", // Assuming the title text is white
    marginBottom: 20,
    marginTop: 17,
    marginLeft: 0, // Spacing below the title
  },
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
  },

  Main: {
    width: 400,
    height: 180,

    borderWidth: 2,
    borderColor: "#2A2A2A",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
  },
  Input: {
    flex: 1,
    marginLeft: 15,
    marginTop: -80,
    fontSize: 20,
  },
  icon: {
    marginRight: 180,
    color: "#fcfcff",
  },
  remindText: {
    fontSize: 25,
    fontWeight: "bold", // Assuming the title is bold
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
    borderRadius: 45, // Corrected borderRadius to make it a circle
    width: 90, // Width of the button
    height: 90, // Height of the button, same as width for circle shape
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  timeButtonText: {
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
  notificationintencitytext: {
    fontSize: 25,
    fontWeight: "bold", // Assuming the title is bold
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
    flex: 1,
  },

  deleteButtonText: {
    color: "#000", // Black text color for the delete button
    fontSize: 18,
    fontWeight: "bold",
  },

  saveButton: {
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
});

