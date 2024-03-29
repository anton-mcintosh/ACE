import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Calendar from "expo-calendar";
import { AsyncStorage } from "react-native";

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0);
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync();
      const events = await Calendar.getEventsAsync(
        calendars[0].id,
        startDate,
        endDate,
      );
      setEvents(events);
    } else {
      console.log("Calendar permission not granted");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentMonth, currentYear]);

  // Handle click event on a day
  const handleDayClick = (day) => {
    // Perform navigation or any other action
    console.log("Clicked on day", day);
  };

  // Handle navigation to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Handle navigation to next month
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get the number of days in the current month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Render days of the current month
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const hasReminders = events[i] && events[i].length > 0;

      days.push(
        <TouchableOpacity key={i} onPress={() => handleDayClick(i)}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{i}</Text>
            {hasReminders && <Ionicons name="alarm" size={24} color="red" />}
            {/* Add more icons for other types of reminders */}
          </View>
        </TouchableOpacity>,
      );
    }

    return days;
  };

  return (
    <View style={styles.calendarContainer}>
      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text>
          {currentMonth}/{currentYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View>{renderDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 10,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
  },
  dayText: {
    fontSize: 18,
  },
});

export default CalendarView;
