import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
    <Tabs.Screen
    name="../Screens/Search"
    options={{
      headerTitle: "Search",
      title: "Search",
    }}
    />
    <Tabs.Screen
    name="../Screens/Settings"
    options={{
      headerTitle: "Settings",
      title: "Settings",
    }}
    />
    </Tabs>
  );
};

export default TabsLayout;
