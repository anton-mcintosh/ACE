import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState, useRef } from "react";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

import { useLocalSearchParams, Link, router } from "expo-router";
import * as Calendar from "expo-calendar"; // Import Calendar module

import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../components/Button";

LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // set thes in the app.json file
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AlarmClock() {
  const notificationListener = useRef();
  const [notification, setNotification] = useState(false);
  const [hourr, setHour] = useState("");
  const [minutee, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");
  const [notificationId, setNotificationId] = useState("none");

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
    getData();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  async function scheduleNotificationsHandler() {
    // Your notification scheduling logic remains the same
  }

  async function turnOffAlarm() {
    // Your turn off alarm logic remains the same
  }

  async function storeData(id) {
    // Your store data logic remains the same
  }

  async function getData() {
    // Your get data logic remains the same
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alarm</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter hour"
        value={hourr}
        onChangeText={(text) => setHour(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter minute"
        value={minutee}
        onChangeText={(text) => setMinute(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter am or pm"
        value={ampm}
        onChangeText={(text) => setAmpm(text)}
      />
      <Pressable style={styles.button} onPress={scheduleNotificationsHandler}>
        <Text style={styles.buttonText}>Turn on Alarm</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={turnOffAlarm}>
        <Text style={styles.buttonText}>Turn off Alarm</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "orange",
    margin: 20,
    fontSize: 60,
    fontWeight: "bold",
  },
  button: {
    width: "70%",
    backgroundColor: "green",
    borderRadius: 18,
    margin: 15,
    padding: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
  textInput: {
    color: "white",
    fontSize: 30,
    margin: 5,
  },
});
