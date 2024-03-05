import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as Calendar from "expo-calendar";
import Ionicons from "react-native-vector-icons/Ionicons";

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function App() {
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarGrid, setCalendarGrid] = useState([]);

  useEffect(() => {
    const getCurrentMonthYear = () => {
      const options = { month: "long", year: "numeric" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      setCurrentMonthYear(formattedDate);
    };

    getCurrentMonthYear();
  }, [currentDate]);

  useEffect(() => {
    generateCalendarGrid();
  }, [currentDate]);

  const generateCalendarGrid = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    const startingDay = firstDayOfMonth.getDay(); // 0 is Sunday

    const grid = [];
    let dayIndex = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push("");
        } else if (dayIndex <= daysInMonth) {
          week.push(dayIndex++);
        }
      }
      grid.push(week);
      if (dayIndex > daysInMonth) {
        break;
      }
    }
    setCalendarGrid(grid);
  };

  const goToNextMonth = () => {
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonthDate);
  };

  const goToPreviousMonth = () => {
    const previousMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(previousMonthDate);
  };

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
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Ionicons
            name="chevron-back"
            size={30}
            color="#000"
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.calendarText}>{currentMonthYear}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons
            name="chevron-forward"
            size={30}
            color="#000"
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.dayText}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {calendarGrid.map((week, index) => (
          <View key={index} style={styles.weekRow}>
            {week.map((day, idx) => (
              <Text key={idx} style={styles.dayCell}>
                {day !== "" ? day : ""}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  arrow: {
    paddingHorizontal: 20,
  },
  calendarText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  daysOfWeekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dayText: {
    fontSize: 20,
    paddingHorizontal: 10, // Add padding between each day
  },
  calendarGrid: {
    paddingHorizontal: 10,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCell: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
