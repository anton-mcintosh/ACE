import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  Agenda,
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { List, ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../colors";
import EditModal from "../Modules/EditModal";
import useTheme from "../Hooks/useTheme";

const Calendar_Month = () => {
  const [calendarEvents, setCalendarEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  ); // Format: "YYYY-MM-DD"
  const [markedDates, setMarkedDates] = useState({});
  const [updatedMarkedDates, setUpdatedMarkedDates] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({}); // State for the selected event
  const { color: colors } = useTheme();

  const onEventPress = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
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
          console.log("Calendar ID: ", storedCalendarId);
          events.forEach((event) => {
            console.log("Event structure:", event);
          });
          const formattedEvents = events.reduce((acc, event) => {
            const date = event.startDate.split("T")[0];
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push({ name: event.title });
            return acc;
          }, {});
          const markedDates = Object.keys(formattedEvents).reduce(
            (acc, date) => {
              const count = formattedEvents[date].length;
              let level = "notBusy;"; // Default value
              if (count > 2 && count <= 5) level = "moderatelyBusy";
              else if (count > 5) level = "busy";

              acc[date] = {
                marked: true,
                dotColor:
                  level === "notBusy"
                    ? "green"
                    : level === "moderatelyBusy"
                      ? "orange"
                      : "red",
              };
              return acc;
            },
            {},
          );
          const updatedMarkedDates = Object.keys(formattedEvents).reduce(
            (acc, date) => {
              const count = formattedEvents[date].length;

              let borderColor = "transparent";
              let borderRadius = 20;
              if (count > 2 && count <= 5)
                (borderColor = "#A3C7D6"), (borderRadius = 8);
              else if (count > 5) (borderColor = "red"), (borderRadius = 20);

              acc[date] = {
                customStyles: {
                  container: {
                    borderColor: borderColor,
                    borderWidth: 2,
                    borderRadius: borderRadius,
                  },
                  text: {
                    color: "white",
                  },
                },
              };

              return acc;
            },
            {},
          );

          setUpdatedMarkedDates(updatedMarkedDates);
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
  console.log("Sample event dates:", Object.keys(calendarEvents).slice(0, 3));
  console.log("Selected Event: ", selectedEvent);

  return (
    <SafeAreaView style={styles.container}>
      <CalendarProvider
        date={selectedDate}
        showTodayButton
        disabledOpacity={0.6}
        theme={{
          backgroundColor: colors.defaultBackground,
        }}
      >
        <ExpandableCalendar
          markingType={"custom"}
          markedDates={updatedMarkedDates}
          theme={{
            selectedDayBackgroundColor: "#363062",
            todayBackgroundColor: "#5C8374",
            calendarBackground: colors.defaultBackground,
            reservationsBackgroundColor: "black", // Background color of the main part of the screen
          }}
          onDayPress={({ dateString }) => {
            setSelectedDate(dateString);
            console.log(selectedDate);
          }}
        />
        <FlatList
          data={calendarEvents[selectedDate] || []} // Correctly reference events for the selected date
          renderItem={({ item }) => {
            // Determine the icon based on the event title
            let iconName = "calendar-alt"; // Default icon
            let iconColor = "white"; // Default color

            if (item.name.includes("Quick Reminder")) {
              iconName = "bolt"; // Change to lightning bolt icon for "Quick Reminder" events
              iconColor = "#ffd700"; // Optional: Change the icon color for specific events
            } else if (item.name.includes("Alarm")) {
              iconName = "bell"; // Change to "Users" icon for "Meeting" events
              iconColor = "#00bfff"; // Optional: Change the icon color for specific events
            }

            return (
              <TouchableOpacity onPress={() => onEventPress(item)}>
                <ListItem bottomDivider containerStyle={styles.item}>
                  <FontAwesome5 name={iconName} size={24} color={iconColor} />
                  <ListItem.Content>
                    <ListItem.Title style={styles.itemText}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Events Found</Text>
            </View>
          }
          onRefresh={() => console.log("Refreshed")}
          refreshing={false}
          extraData={calendarEvents}
        />
      </CalendarProvider>
      <EditModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        eventId={selectedEvent.id}
      />
    </SafeAreaView>
  );
};

export default Calendar_Month;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackground,
  },
  item: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
  },
  itemText: {
    color: "white",
    fontSize: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noDataText: {
    color: "white",
    fontSize: 16,
  },
});
