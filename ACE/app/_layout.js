import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
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
