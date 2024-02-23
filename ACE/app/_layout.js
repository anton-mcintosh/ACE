import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack>
           /*<Stack.Screen name="(tabs)"
           options={{
             headerShown: false
           }}/> */
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
  </Stack>;
};
export default RootLayout;
