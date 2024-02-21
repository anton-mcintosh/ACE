import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.text}>ACE</Text>
      </View>
      {/* Circles */}
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Quick</Text>
          <Ionicons name="flash" size={40} color="#ffffff" />
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Event</Text>
          <Ionicons name="calendar" size={40} color="#ffffff" />
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Alarm</Text>
          <Ionicons name="alarm" size={40} color="#ffffff" />
        </View>
          {/* Small circle on the left */}
        <View style={styles.smallCircleLeft}>
          <Ionicons name="search" size={30} color="#ffffff"/>
        </View>

          {/* Small circle on the right */}
        <View style={styles.smallCircleRight}>
          <Ionicons name="settings" size={30} color="#ffffff"/>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
  },
  circleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'orange',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 30,
    color: '#ffffff',
  },
  smallCircleLeft: {
    position: 'absolute',
    bottom: -10,
    left: -70,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCircleRight: {
    position: 'absolute',
    bottom: -10,
    right: -70,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
