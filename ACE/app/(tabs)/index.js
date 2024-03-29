import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../components/Button";
import { useFonts } from 'expo-font';
import useTheme from "../Hooks/useTheme";


export default function App() {
  const { color: colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: colors.background}]}>

    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Circles */}
      {/* Replace circles with Button component */}
      <View style={styles.header}>

         <Text style={[styles.ACEtext, {color : colors.chevcolor}]}>ACE</Text>
       </View>
      <Button
        label="Quick"
        theme="primary"
        onPress={() => router.push("/Screens/QuickReminder")}
      >
        <Ionicons name="flash" size={40} color="#ffffff" />
      </Button>
      <Button
        label="Event"
        theme="primary"
        onPress={() => router.push("/Screens/Event")}
      >
        <Ionicons name="calendar" size={40} color="#ffffff" />
      </Button>
      <Button
        label="Alarm"
        theme="primary"
        onPress={() => router.push("/Screens/Alarm")}
      >
        <Ionicons name="alarm" size={40} color="#ffffff" />
      </Button>

      {/* StatusBar */}
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Make sure the container is relative positioned
  },
  swipeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 50, // Adjust this width as needed
    height: "100%",
    zIndex: 1, // Make sure it's above other components
  },

  smallCircleLeft: {
    position: "absolute",
    bottom: 50, // Adjust this value as needed
    left: 20, // Adjust this value as needed
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
  },
  smallCircleRight: {
    position: "absolute",
    bottom: 50, // Adjust this value as needed
    right: 20, // Adjust this value as needed
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
  },
  ACEtext: {
    fontSize: 60,
    fontWeight: "bold",
    //fontFamily:"RubikGemstones-Regular"
  },
});