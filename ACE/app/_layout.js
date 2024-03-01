import { Stack } from "expo-router";

const RootLayout = () => {
  return <Stack>
        <Stack.Screen name="index" options={{
          headerTitle: "ACE",
          headerTitleStyle: {
            color: 'white',
            fontSize: 35,
          },
          headerStyle: {
            backgroundColor: 'black',
          },
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
        <Stack.Screen name="/Screens/Settings" options={{
              headerTitle: "Settings"
        }}/>
  </Stack>;
};
export default RootLayout;
