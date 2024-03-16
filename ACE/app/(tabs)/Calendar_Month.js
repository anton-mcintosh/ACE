import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Agenda } from "react-native-calendars";
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useTheme from "../Hooks/useTheme";
import { colors } from "../colors";

const Calendar_Month = () => {
  const { color: colors } = useTheme();
  const [calendarEvents, setCalendarEvents] = useState({});
  
  const getStoredCalendarId = async () => {
    try {
      const calendarId = await AsyncStorage.getItem("ACE_Calendar");
      if (calendarId !== null) {
        console.log("Calendar ID from AsyncStorage:", calendarId);
        return calendarId;
      }
    } catch (error) {
      console.log("Error retrieving calendar ID from AsyncStorage:", error);
    }
    return null;
  };

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const storedCalendarId = await getStoredCalendarId();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        if (storedCalendarId) {
          const events = await Calendar.getEventsAsync(
            [storedCalendarId],
            yesterday,
            nextYear,
          );
          console.log("Calendar events:", events);
          console.log("Calendar ID: ", storedCalendarId);
          const formattedEvents = events.reduce((acc, event) => {
            const date = event.startDate.split("T")[0];
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push({ name: event.title });
            return acc;
          }, {});
          setCalendarEvents(formattedEvents);
        } else {
          console.log("Calendar ID not found in AsyncStorage.");
        }
      } else {
        console.log("Calendar permission not granted.");
      }
    };
    fetchCalendarEvents();
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <Agenda
        showClosingKnob={true}
        theme={{
          selectedDayBackgroundColor: "green",
          todayBackgroundColor: "orange",
          agendaDayTextColor: "blue",
          agendaTodayColor: "orange",
          agendaBackground: "black",
          calendarBackground: "black",
          reservationsBackgroundColor: "black", // Background color of the main part of the screen
        }}
        items={calendarEvents}
        renderItem={(item) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Calendar_Month;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: "white",
  },
});
