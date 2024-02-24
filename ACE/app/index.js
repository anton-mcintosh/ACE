import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link, router } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import Button from './components/Button';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Circles */}
        {/* Replace circles with Button component */}
        <Button label="Quick" theme="primary" onPress={() => router.push("/Screens/QuickReminder")}>
          <Ionicons name="flash" size={40} color="#ffffff" />
        </Button>
        <Button label="Event" theme="primary" onPress={() => router.push("/Screens/Event")}>
          <Ionicons name="calendar" size={40} color="#ffffff" />
        </Button>
        <Button label="Alarm" theme="primary" onPress={() => router.push("/Screens/Alarm")}>
          <Ionicons name="alarm" size={40} color="#ffffff" />
        </Button>

      {/* Small Circle Left */}
      <View style={styles.smallCircleLeft}>
        <Button theme="secondary" onPress={() => router.push("/Screens/Search")}>
          <Ionicons name="search" size={30} color="#ffffff" />
        </Button>
      </View>

      {/* Small Circle Right */}
      <View style={styles.smallCircleRight}>
        <Button theme="secondary" onPress={() => router.push("/Screens/Settings")}>
          <Ionicons name="settings-outline" size={30} color="#ffffff" />
        </Button>
      </View>

      {/* StatusBar */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Make sure the container is relative positioned
  },
  // Other styles...

  smallCircleLeft: {
    position: 'absolute',
    bottom: 50, // Adjust this value as needed
    left: 20, // Adjust this value as needed
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
  },
  smallCircleRight: {
    position: 'absolute',
    bottom: 50, // Adjust this value as needed
    right: 20, // Adjust this value as needed
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
