/*Event Screen*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Platform,ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { SafeAreaView } from 'react-native-safe-area-context';

const Event = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedIntensity, setSelectedIntensity] = useState(null);
    //const [selectedTimeReminder, setSelectedTimeReminder] = useState(null);


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        if (Platform.OS !== 'ios') {
            setShowDatePicker(false); // Automatically hide date picker on Android after selection
        }
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
        if (Platform.OS !== 'ios') {
            setShowTimePicker(false); // Automatically hide time picker on Android after selection
        }
    };

    const [selectedTime, setSelectedTime] = useState(null);

    const handleSetReminder = (time) => {
        setSelectedTime(time);
        // Add the logic to actually set the reminder here
    };


    const isSelected = (time) => {
        return selectedTime === time;
    };

    const handleSelectIntensity = (intensity) => {
        setSelectedIntensity(intensity);
    };

    return (
            <ScrollView>
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Text style={styles.title}>Event setup</Text>
            <StatusBar style="auto" />
            
            <View style={styles.Main}>
                <TextInput placeholder='Title' placeholderTextColor='#bdbebf' style={styles.Input} editable={true} />
            </View>
            
            <View style={styles.Main1}>
                <TextInput placeholder='Describe Event...' placeholderTextColor='#bdbebf' style={styles.Input1} />
            </View>
            
            <View style={styles.dateChangeContainer}>
    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change Date</Text>
    </TouchableOpacity>
    <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
</View>

<View style={styles.timeChangeContainer}>
    <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change Time</Text>
    </TouchableOpacity>
    <Text style={styles.timeText}>{time.toLocaleTimeString()}</Text>
</View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    testID="timePicker"
                    value={time}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeTime}
                />
            )}
            <View style={styles.Main}>
    <TextInput 
        placeholder='Location' 
        placeholderTextColor='#FEFEFE' 
        style={styles.Input} 
        // Add any additional props you need for the location input
    />
    <TouchableOpacity style={styles.locationIconContainer}>
        <SimpleLineIcons name="location-pin" style={styles.locationIcon} />
    </TouchableOpacity>
</View>
            <Text style={styles.remindText}>Heads up :</Text>
      <View style={styles.timeButtonContainer}>
            {['15 min', '30 min', '1 hour'].map((time) => (
                <TouchableOpacity
                    key={time}
                    style={[
                        styles.timeButton,
                        isSelected(time) && styles.selectedTimeButton // Add the selected style conditionally
                    ]}
                    onPress={() => handleSetReminder(time)}
                >
                    <Text style={styles.timeButtonText}>{time}</Text>
                </TouchableOpacity>
            ))}
        </View>
      <Text style={styles.notificationintencity}>Notification Intencity:</Text>
      <View style={styles.notificationButtonContainer}>
    <TouchableOpacity 
        onPress={() => handleSelectIntensity('volume-down')} 
        style={[
            styles.notificationButton2, 
            selectedIntensity === 'volume-down' && styles.selectedIntensityButton
        ]}>
        <FontAwesome5 name="volume-down" style={styles.notificationIcon} />
    </TouchableOpacity>

    <TouchableOpacity 
        onPress={() => handleSelectIntensity('volume-up')} 
        style={[
            styles.notificationButton2, 
            selectedIntensity === 'volume-up' && styles.selectedIntensityButton
        ]}>
        <FontAwesome5 name="volume-up" style={styles.notificationIcon} />
    </TouchableOpacity>

    <TouchableOpacity 
        onPress={() => handleSelectIntensity('microphone-settings')} 
        style={[
            styles.notificationButton2, 
            selectedIntensity === 'microphone-settings' && styles.selectedIntensityButton
        ]}>
        <MaterialCommunityIcons name="microphone-settings" style={styles.notificationIcon} />
    </TouchableOpacity>
</View>
      <View style={styles.actionButtonContainer}>
  {/* Delete Reminder Button */}
  <TouchableOpacity style={styles.deleteButton}>
    <Text style={styles.deleteButtonText}>Delete Event</Text>
  </TouchableOpacity>

  {/* Save Changes Button */}
  <TouchableOpacity style={styles.saveButton}>
    <Text style={styles.actionButtonText}>Save Changes</Text>
  </TouchableOpacity>
</View>
        </View>
        </SafeAreaView>
        </ScrollView>
        
    );
}

export default Event;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: -30,
        alignSelf: 'flex-start',
        marginLeft: 90,
    },
    Main:{
        backgroundColor:'#151515',
        width:400,
        height:60,
        borderWidth:2,
        borderColor:'#2A2A2A',
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomRightRadius:30,
        flexDirection:'row',
        marginTop :20,
        flexDirection: 'row', // This ensures the TextInput and Icon are in the same row
    justifyContent: 'space-between', // This spreads out the TextInput and Icon within the container
    alignItems: 'center',
    },
    // Input:{
    //     flex : 1,
    //     marginLeft:15,
    //     fontSize:20,
    //     color:'#fff'
    // },
    Input: {
        flex: 1,
        marginLeft: 15,
        marginTop: 0,
        fontSize: 20,
        color: '#fff',
        minHeight: 40, // Ensure this is high enough for easy tapping
    },
    Main1:{
        backgroundColor:'#151515',
        width:400,
        height:130,
        marginTop:25,
        borderWidth:2,
        borderColor:'#2A2A2A',
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomRightRadius:30,
        flexDirection:'row'
    },
    Input1:{
        flex : 1,
        marginLeft:15,
        marginTop:-10,
        fontSize:25,
        color:'#fff'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    changeButton: {
        backgroundColor: '#d1630c', // Button color
        paddingVertical: 15, // Increases height
        paddingHorizontal: 20, // Increases width
        borderRadius: 20, // Higher value for more pronounced curves
        marginHorizontal: 35, // Adjust if needed to maintain gap between buttons
        width: 150, // You can adjust this as needed
    marginHorizontal: 5, // Adjust the spacing from the sides if needed
    marginTop:10,
    },
    changeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold', // Make the text bold
        fontSize:19,
    },
    dateTimeContainer: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'center', // Center the items horizontally
        marginTop: 30, // Space from the top or previous element
      },
      
      dateText: {
        color: '#fff',
        fontSize: 30,
        marginRight: 70, // Adjust the gap between the date and time by changing this value
        flex: 1, // Take up the remaining space
    textAlign: 'right', // Align the text to the right
    marginTop:16,
      },
      
      timeText: {
        color: '#fff',
        fontSize: 30,
        marginRight:50,
        // Add marginLeft if you need more space on the left side as well
        flex: 1, // Take up the remaining space
    textAlign: 'right', // Align the text to the right
    marginTop: 12,
      },
    remindText: {
        fontSize: 24,
         color: '#fff',
         marginTop: 15, // Space from the microphone icon
         alignSelf: 'flex-start', // Align to the start of the flex container
         marginLeft: 20, // Match the left margin of the title
        },
        timeButtonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around', // This will space your buttons evenly
          width: '100%', // Use the full width of the container for even spacing
          marginTop: 20, // Space from the "Remind in:" text
          fontWeight :'bold',
          
        },
        timeButton: {
          backgroundColor: '#D2630F', // Orange background for the buttons
          borderRadius: 45, // Corrected borderRadius to make it a circle
          width: 90, // Width of the button
          height: 90, // Height of the button, same as width for circle shape
          justifyContent: 'center', // Center the text vertically
          alignItems: 'center', // Center the text horizontally
        },
        timeButtonText: {
          color: '#fff', // White text color
          fontSize: 18, // Font size for the button text
        },
        notificationButton: {
          backgroundColor: '#D2630F', // Orange background for the buttons
          borderRadius: 25, // This should be half the width and height
          width: 50, // Width of the button
          height: 50, // Height of the button, should be the same as the width for a circle
          justifyContent: 'center', // Center the icon vertically
          alignItems: 'center', // Center the icon horizontally
          marginHorizontal: 10, // Add some horizontal margin if needed
        },
        notificationIcon: {
          color: '#fff', // White icon color
          fontSize: 24, // Icon size
        },
        notificationintencity :{
          fontSize: 22,
         color: '#fff',
         marginTop: 38, // Space from the microphone icon
         alignSelf: 'flex-start', // Align to the start of the flex container
         marginLeft: 20, // Match the left margin of the title
        },
        notificationButtonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30,
        },
        notificationButton2: {
          backgroundColor: '#D2630F', // Orange background for the buttons
          borderRadius: 35, // This should be half the width and height for a perfect circle
          width: 80, // Increased width of the button for a larger size
          height: 80, // Increased height of the button for a larger size
          justifyContent: 'center', // Center the icon vertically
          alignItems: 'center', // Center the icon horizontally
          marginHorizontal: 30, // Add some horizontal margin if needed
        },
        
        notificationIcon: {
          color: '#fff', // White icon color
          fontSize: 30, // Increased icon size
        },
       // Styles for the action buttons at the bottom of the screen
      actionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30,
        paddingHorizontal: 20,
      },
      
      deleteButton: {
        backgroundColor: '#fff', // White background for the delete button
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        textAlign:'center',
        flex: 1,
      },
      
      deleteButtonText: {
        color: '#000', // Black text color for the delete button
        fontSize: 18,
        fontWeight: 'bold',

        textAlign:'center',
      },
      
      saveButton: {
        backgroundColor: '#D2630F', // Orange background for the save button
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal:10,
        flex: 1,
      },
      
      actionButtonText: {
        color: '#fff', // White text color for the save button
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center'
      },
      
      
        selectedTimeButton: {
            borderColor: '#ffff', // This will be the color of the outline
            borderWidth: 4, // This sets the thickness of the outline
        },
        safeArea: {
            flex: 1,
            backgroundColor: '#000', // Match the background color with the rest of your app
        },
        selectedIntensityButton: {
            borderColor: 'white',
            borderWidth: 3,
            // any other style adjustments
        },
        locationIconContainer: {
            marginRight: 15, // Spacing to the right of the icon
        },
        locationIcon: {
            fontSize: 24, // Size of the location icon
            color: '#FEFEFE', // Color of the location icon, assumed to be white
        },
        dateChangeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 10, // Adjust padding as needed
        },
        
        timeChangeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 10, // Adjust padding as needed
        },
        
});
