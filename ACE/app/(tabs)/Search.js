import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Calendar from 'expo-calendar';

// const fetchEvents = async () => {
//   const { status } = await Calendar.requestCalendarPermissionsAsync();
//   if (status !== 'granted') {
//     alert('You need to grant calendar permissions to use this feature');
//     return [];
//   }

//   const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
//   let events = [];
//   for (const calendar of calendars) {
//     const startDate = new Date();
//     const endDate = new Date(startDate);
//     endDate.setFullYear(endDate.getFullYear() + 1); // Search for events up to one year in the future
//     const calendarEvents = await Calendar.getEventsAsync([calendar.id], startDate, endDate);
//     events = events.concat(calendarEvents);
//   }
//   return events;
// };

const fetchEvents = async () => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== 'granted') {
    alert('You need to grant calendar permissions to use this feature');
    return [];
  }

  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  // Filter to only include calendars named "Expo Calendar"
  const expoCalendars = calendars.filter(calendar => calendar.title === "Expo Calendar");
  
  let events = [];
  for (const calendar of expoCalendars) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // Adjust based on your needs

    const calendarEvents = await Calendar.getEventsAsync(
      [calendar.id],
      startDate,
      endDate
    );
    events = [...events, ...calendarEvents];
  }
  return events;
};


export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const events = await fetchEvents();
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredEvents);
  };

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.assembler}>
        <View style={style.Main}>
          <TextInput
            placeholder='search               '
            style={style.Input}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View style={style.buttonP}>
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name='search' size={24} color="#fcfcff" style={style.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={style.resultsContainer}>
        {searchResults.map((event, index) => (
          <Text key={index} style={style.resultText}>
            {event.title}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  assembler: {
    flexDirection: 'row',
    marginTop: 120,
    marginLeft: 24,
  },
  Main: {
    backgroundColor: '#FFF',
    width: 300,
    height: 60,
    borderWidth: 3,
    borderColor: '#c0c0c0',
    borderRadius: 20,
    flexDirection: 'row',
  },
  Input: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 20,
    flex: 1,
  },
  buttonP: {
    height: 60,
    width: 60,
    backgroundColor: '#1d1d1f',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
});