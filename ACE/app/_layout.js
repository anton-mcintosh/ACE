import { Stack } from "expo-router";
import { colors } from "./colors";
const RootLayout = () => {
  return (
    <Stack
    screenOptions={{
      headerTitle: "",
      headerStyle: {
        backgroundColor: colors.defaultBackground,
        
      },
      headerTintColor: "white",
    
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

export default RootLayout;
