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
import { Agenda, Calendar } from "react-native-calendars";
//import * as Calendar from "expo-calendar";
import Ionicons from "react-native-vector-icons/Ionicons";

import { agendaItems } from "../mocks/agendaitems";

const Calendar_Month = () => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        selected={today}
        items={agendaItems.reduce((acc, item) => {
          acc[item.title] = item.data.map(({ title }) => ({ name: title }));
          return acc;
        }, {})}
        renderItem={(item, isFirst) => (
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  calendar: {
    marginTop: 30,
  },
  agendaList: {
    flex: 1,
    marginTop: 20,
  },
});

