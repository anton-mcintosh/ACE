import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Calendar from 'expo-calendar';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  async function requestCalendarPermissions() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to grant calendar permissions to use this feature');
      return false;
    }
    return true;
  }

  async function fetchEvents() {
    const permission = await requestCalendarPermissions();
    if (!permission) return [];

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    let events = [];
    for (const calendar of calendars) {
      const calendarEvents = await Calendar.getEventsAsync(
        [calendar.id],
        new Date(),
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // Fetch events for the next year
      );
      events = [...events, ...calendarEvents];
    }
    return events;
  }

  async function handleSearch() {
    const events = await fetchEvents();
    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredEvents);
  }

  // The UI part remains largely the same
  return (
    <View>
      <View style={style.assembler}>
        <View style={style.Main}>
          <TextInput
            placeholder="search  ....           "
            style={style.Input}
            onChangeText={setSearchQuery}
            value={searchQuery}
          ></TextInput>
        </View>
        <View style={style.buttonP}>
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name="search" size={40} style={style.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {searchResults.map((event, index) => (
          <Text key={index} style={{ margin: 10 }}>
            {event.title}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
