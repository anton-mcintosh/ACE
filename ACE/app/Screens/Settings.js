import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link, router } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../components/Button';
const Settings = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Settings</Text>
            <StatusBar style="auto" />
        </View>
    );
}
export default Settings;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
  },
    smallCircle: {
        position: 'absolute',
        top: 100,
        right: 100,
        width: 2,
        height: 2,
        borderRadius: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
