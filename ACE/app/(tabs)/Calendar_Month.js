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

const Calendar_Month = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        selected="2022-12-01"
        items={{
          "2022-12-01": [
            { name: "Cycling" },
            { name: "Walking" },
            { name: "Running" },
          ],
          "2022-12-02": [{ name: "Writing" }],
        }}
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
