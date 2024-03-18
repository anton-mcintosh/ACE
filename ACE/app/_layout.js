import React from 'react'; // If you're using JSX, you need React
import { Stack } from "expo-router";
import { colors } from "./colors";
import ThemeProvider from './Contexts/Theme';
import useTheme from './Hooks/useTheme';
// Import other necessary components or libraries

const RootLayout = () => {
  const { color: colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.chevcolor,
      }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RooLayout = () => {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}

export default RooLayout;