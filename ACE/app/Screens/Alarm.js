import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../styles";
import { colors } from "../colors";
import Button from "../components/Button";

const Alarm = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [alarmTitle, setAlarmTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedIntensity, setSelectedIntensity] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Alarm</Text>
      </View>
      <View style={tempStyles.titleContainer}>
        <TextInput
          style={tempStyles.titleInput}
          placeholderTextColor={colors.defaultText}
          placeholder="Title your alarm"
          editable={true}
        />
      </View>
      <View style={tempStyles.rowContainer}>
        <Text style={tempStyles.rowText}>Time</Text>
        <TouchableOpacity
          style={tempStyles.rowSelection}
          onPress={() => setShowDatePicker(true)}
        ></TouchableOpacity>
      </View>
      <View style={tempStyles.rowContainer}>
        <Text style={tempStyles.rowText}>Date</Text>
        <TouchableOpacity
          style={tempStyles.rowSelection}
          onPress={() => setShowTimePicker(true)}
        ></TouchableOpacity>
      </View>
      <View style={tempStyles.rowContainer}>
        <Text style={tempStyles.rowText}>Repeat</Text>
        <TouchableOpacity
          style={tempStyles.rowSelection}
          // onPress={() => setShowTimePicker(true)}
        ></TouchableOpacity>
      </View>
      <View style={tempStyles.rowContainer}>
        <Text style={tempStyles.rowText}>Snooze</Text>
        <TouchableOpacity
          style={tempStyles.rowSelection}
          // onPress={() => setShowTimePicker(true)}
        ></TouchableOpacity>
      </View>
      <View style={tempStyles.rowContainer}>
        <Text style={tempStyles.rowText}>Type</Text>
        <TouchableOpacity
          style={tempStyles.rowSelection}
          // onPress={() => setShowTimePicker(true)}
        ></TouchableOpacity>
      </View>
      <Text style={tempStyles.plainText}>Notification Intensity</Text>
      <View style={tempStyles.rowContainer}>
        <Button theme="secondary">
          <FontAwesome5
            name="volume-down"
            size={40}
            color={colors.defaultText}
          />
        </Button>
        <Button theme="secondary">
          <FontAwesome5
            name="volume-up"
            size={40}
            color={colors.defaultText}
          ></FontAwesome5>
        </Button>
        <Button theme="secondary">
          <MaterialCommunityIcons
            name="microphone-settings"
            size={40}
            color={colors.defaultText}
          ></MaterialCommunityIcons>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Alarm;
const tempStyles = StyleSheet.create({
  titleContainer: {
    width: 350,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: colors.secondaryBackground,
  },
  titleInput: {
    flex: 1,
    fontSize: 30,
    color: colors.defaultText,
    width: "80%",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    minHeight: 50,
    marginLeft: 20,
  },
  rowContainer: {
    width: 400,
    height: 60,
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
  },
  rowText: {
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 30,
    color: colors.defaultText,
  },
  rowSelection: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 2,
  },
  plainText: {
    fontSize: 30,
    color: colors.defaultText,
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 40,
  },
});
