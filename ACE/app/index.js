import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link, router } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import Button from './components/Button';
export default function App() {
  return (
     <View style={styles.container}>
       {/* Header */}
       <View style={styles.header}>

         <Text style={styles.text}>ACE</Text>
       </View>

       {/* Circles */}
       <View style={styles.circleContainer}>
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
       </View>
    {/*Small Circle Left*/}
         <View style={styles.smallCircleLeft}>
           <Ionicons name="search" size={30} color="#ffffff"/>
         </View>
    {/*Small Circle Right*/}
         <View style={styles.smallCircleRight}>
           <Ionicons name="settings" size={30} color="#ffffff"/>
        </View>
        <StatusBar style="auto" />
    </View>
   );
 };

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
    position: 'relative',
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
  },
  circleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 50,
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
    zIndex: 2,
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
