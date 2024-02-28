import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Sample data representing reminders on specific days
  const reminders = {
    10: ['alarm', 'event'], // Reminders on the 10th day of the month
    15: ['reminder'], // Reminders on the 15th day of the month
    // Add more reminders as needed
  };

  // Handle click event on a day
  const handleDayClick = (day) => {
    // Perform navigation or any other action
    console.log('Clicked on day', day);
  };

  // Handle navigation to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Handle navigation to next month
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get the number of days in the current month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Render days of the current month
 const renderDays = () => {
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const days = [];
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay(); // Get the day of the week for the first day of the month
  let dayCounter = 1;

  for (let i = 0; i < 6; i++) { // Assuming maximum 6 rows
    const row = [];
    for (let j = 0; j < 7; j++) { // 7 days in a week
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        // Render empty cell if it's before the first day of the month or after the last day of the month
        row.push(
          <View key={`${i}-${j}`} style={styles.dayContainer} />
        );
      } else {
        const hasReminders = reminders[dayCounter] && reminders[dayCounter].length > 0;
        row.push(
          <TouchableOpacity key={`${i}-${j}`} onPress={() => handleDayClick(dayCounter)}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayText}>{dayCounter}</Text>
              {hasReminders && <Ionicons name="alarm" size={24} color="red" />}
              {/* Add more icons for other types of reminders */}
            </View>
          </TouchableOpacity>
        );
        dayCounter++;
      }
    }
    days.push(<View key={i} style={styles.row}>{row}</View>);
  }

  return days;
};

  return (
    <View style={styles.calendarContainer}>
      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text>{currentMonth}/{currentYear}</Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View>
        {renderDays()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },
  dayText: {
    fontSize: 18,
  },
});

export default Calendar;
