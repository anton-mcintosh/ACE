/*Quick Reminder Screen*/
import { StatusBar } from "expo-status-bar";
//import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../components/Button";

import AsyncStorage from "@react-native-async-storage/async-storage";

const QuickReminder = () => {
  const [description, setDescription] = useState(""); // State for the reminder description
  const [selectedTime, setSelectedTime] = useState(null);

  const handleSetReminder = async () => {
    setSelectedTime(time); 
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

 const isSelected = (time) => selectedTime === time;

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Reminder</Text>
      <StatusBar style="auto" />
      <View style={styles.Main}>
        <TextInput
          placeholder="Brief Description...       "
          placeholderTextColor="#FEFEFE"
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
      <Text style={styles.remindText}>Remind In:</Text>
<ScrollView
  horizontal={true}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.timeButtonContainerScroll}
>
  {["5 min", "10 min", "15 min", "30 min", "45 min","1 hour"].map((time, index) => (
    <TouchableOpacity
    key={index}
    style={[
      styles.timeButton,
      isSelected(time) && styles.selectedTimeButton,
    ]}
    onPress={() => setSelectedTime(time)}
    >
      <Text style={styles.timeButtonText}>{time}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>
      <Text style={styles.notificationintencity}>Notification Intencity:</Text>
      <View style={styles.notificationButtonContainer}>
        {/* Low Volume Button */}
        <TouchableOpacity style={styles.notificationButton2}>
          <FontAwesome5 name="volume-down" style={styles.notificationIcon} />
        </TouchableOpacity>

        {/* High Volume Button */}
        <TouchableOpacity style={styles.notificationButton2}>
          <FontAwesome5 name="volume-up" style={styles.notificationIcon} />
        </TouchableOpacity>

        {/* Microphone Settings Button */}
        <TouchableOpacity style={styles.notificationButton2}>
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSetReminder}>
          <Text style={styles.actionButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default QuickReminder;
const styles = StyleSheet.create({
  selectedTimeButton: {
    borderColor: "#ffff",
    borderWidth: 4,
    backgroundColor: "#E57C00", // A different background color for selected state
  },
  timeButtonContainerScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13, // Add vertical padding for visual comfort
    paddingHorizontal: 20, // Add horizontal padding to ensure space on the sides
    marginTop:15,
  },
  
  title: {
    fontSize: 43, // Assuming a larger font size for the title
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
    backgroundColor: "#000", // Assuming the background is black
  },

  Main: {
    backgroundColor: "#151515",
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

    color: "#fff",
  },
  icon: {
    marginRight: 180,
    color: "#fcfcff",
  },
  remindText: {
    fontSize: 25,
    fontWeight: "bold",
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
    marginHorizontal:10,
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
    fontSize: 25,
    fontWeight: "bold",
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
    flex: 1,
  },

  deleteButtonText: {
    color: "#000", // Black text color for the delete button
    fontSize: 18,
    fontWeight: "bold",
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
});
