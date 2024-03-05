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
import { Calendar } from "react-native-calendars";
//import * as Calendar from "expo-calendar";
import Ionicons from "react-native-vector-icons/Ionicons";

const Calendar_Month = () => {
  return (
    <SafeAreaView>
      <View style={styles.calendar}>
        <Calendar />
      </View>
    </SafeAreaView>
  );
};
export default Calendar_Month;
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
  calendar: {
    marginTop: 30,
  },
});
