import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import * as Calendar from "expo-calendar";

export default function App() {
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const getCurrentMonthYear = () => {
      const options = { month: "long", year: "numeric" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      setCurrentMonthYear(formattedDate);
    };

    getCurrentMonthYear();
  }, [currentDate]);

  const goToNextMonth = () => {
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    setCurrentDate(nextMonthDate);
  };

  const goToPreviousMonth = () => {
    const previousMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    setCurrentDate(previousMonthDate);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Previous" onPress={goToPreviousMonth} />
        <Text>{currentMonthYear}</Text>
        <Button title="Next" onPress={goToNextMonth} />
      </View>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
