import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../components/Button";
import ThemeProvider from "../Contexts/Theme";
import useTheme from "../Hooks/useTheme";

export default function App() {
  const { color: colors } = useTheme();
  
  return (
    
    <View style={[styles.container,{backgroundColor: colors.background}]}>
      {/* Circles */}
      {/* Replace circles with Button component */}
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


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
});
