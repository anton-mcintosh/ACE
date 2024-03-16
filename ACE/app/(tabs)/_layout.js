import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemeProvider from "../Contexts/Theme";
import useTheme from "../Hooks/useTheme";
import { View } from "react-native";
import { useState, useEffect } from "react";
import CustomTabs from "../components/tabs";

const TabsLayout = () => {
  
  return (
    <ThemeProvider>
      <CustomTabs/>
    </ThemeProvider>
  );
};

export default TabsLayout;