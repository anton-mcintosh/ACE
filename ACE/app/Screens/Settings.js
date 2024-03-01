/* Settings Screen */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { useLocalSearchParams, Link, router } from 'expo-router';}

import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../components/Button';

const settings = () => {
    return (
        <view style ={styles.header}>
            <text style ={styles.text}>Settings & Customization</text>
            <StatusBar style = 'auto'/>
        </view>
    )
}

export default settings;

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


});
