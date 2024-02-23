import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack>
        <Stack.Screen name="index" options={{
          headerTitle: "Home"
        }} />
        <Stack.Screen name="/Screens/QuickReminder" options={{
          headerTitle: "Quick Reminder"
        }} />
        <Stack.Screen name="/Screens/Event" options={{
          headerTitle: "Event"
        }} />
        <Stack.Screen name="/Screens/Alarm" options={{
          headerTitle: "Alarm"
        }} />
           <Stack.Screen name="/Screens/Search" options={{
             headerTitle: "Search"
           }}/>
  </Stack>;
};
export default RootLayout;
