/*Event Screen*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link, router } from 'expo-router';
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../components/Button';
const Event = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode === 'date') {
            const currentDate = selectedValue || date;
            setDate(currentDate);
        } else {
            const currentTime = selectedValue || time;
            setTime(currentTime);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Event setup</Text>
            <StatusBar style="auto" />
            
        <View style={styles.Main}>
                <TextInput placeholder='Title          ' placeholderTextColor='#FEFEFE' style={styles.Input} ></TextInput>
            </View>
            <View style={styles.Main1}>
                <TextInput placeholder='Describe Event...       ' placeholderTextColor='#FEFEFE' style={styles.Input1} ></TextInput>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Date</Text>
                <Button onPress={() => showMode('date')} title="Select date" />
                <Text style={styles.dateText}>
                    {date.toLocaleDateString()}
                </Text>
            </View>

            {/* Time Picker */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Time</Text>
                <Button onPress={() => showMode('time')} title=" Select time" />
                <Text style={styles.dateText}>
                    {time.toLocaleTimeString()}
                </Text>
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={mode === 'date' ? date : time}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
                
        </View>
    );
}
export default Event;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'center',
        backgroundColor: '#000', // Assuming the background is black
    },
    title: {
        fontSize: 50, // Adjust the size to fit your design
        fontWeight: 'bold', // Assuming the title is bold
        color: '#fff', // Assuming the title text is white
        marginTop: 20, // Adjust the top margin to position the title correctly
        alignSelf: 'flex-start', // Align to the start of the flex container
        marginLeft: 90, // Match the left margin as per your design
        
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
    },
    Input:{
          flex : 1,
          marginLeft:15,
          marginTop:0,
          fontSize:20,
          
          color:'#fff'
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
              marginTop:-75,
              fontSize:25,
              
              color:'#fff'
            },
        
            inputContainer: {
                marginTop: 20,
            },
            label: {
                color: '#fff',
                marginBottom: 5,
                marginLeft:-160,
              marginTop:10,
              fontSize:30,
              //alignContent:'left'

            },
            dateText: {
                color: '#fff',
                marginBottom: 0,
                fontSize:20,
            },

});
