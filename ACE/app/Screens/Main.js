import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../components/Button';
import useTheme from '../Hooks/useTheme';

export default function MainScreen({ navigation }) {
  const { color: colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button
        label="Quick"
        theme="primary"
        onPress={() => navigation.navigate('QuickReminder')}
      >
        <Ionicons name="flash" size={40} color="#ffffff" />
      </Button>
      <Button
        label="Event"
        theme="primary"
        onPress={() => navigation.navigate('Event')}
      >
        <Ionicons name="calendar" size={40} color="#ffffff" />
      </Button>
      <Button
        label="Alarm"
        theme="primary"
        onPress={() => navigation.navigate('Alarm')}
      >
        <Ionicons name="alarm" size={40} color="#ffffff" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});