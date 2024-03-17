/* Settings Screen */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Link, router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

import { Ionicons, Entypo , FontAwesome} from '@expo/vector-icons/';
import Button from '../components/Button';

const Settings = () => {
    const { setTheme, theme } = useTheme();
    const { color: colors } = useTheme();

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
    };

    const isLightTheme = theme === 'light';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Settings</Text>
                <StatusBar style="auto" />
            </View>
            <View style={styles.settingsItem}>
                <Text style={styles.text}>Theme </Text>
                <FontAwesome name="paint-brush" size={30} color="#ffffff"/>
            </View>
            <View style={styles.buttonRow}>
                <View style={[styles.circleButton, { backgroundColor: '#000000' }]} >
                    <Text style={[styles.buttonText, {color: '#FFFFFF'}]}>Dark</Text>
                </View>
                <View style={[styles.circleButton, { backgroundColor: '#ADD8E6' }]} >
                    <Text style={styles.buttonText}>Blue</Text>
                </View>
                <View style={[styles.circleButton, { backgroundColor: '#FFB6C1' }]} >
                    <Text style={styles.buttonText}>Pink</Text>
                </View>
            </View>
            <View style={styles.wideButtonContainer}>
                <View style={styles.wideButton}>
                    <Text style={styles.text}>Icons</Text>
                    <Entypo name="chevron-right" size={30} color="#ffffff"/>
                </View>
            </View>
        </View>
    );
}
export default Settings;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray', 
    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 30,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 35,
    },
    circleButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    buttonText: {
        textAlign: 'center',
        lineHeight: 66,
        fontSize: 17,
        color: '#000000',
    }, 

    wideButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    
    },
    wideButton: {
        width: 320,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: 'orange',
    }
}); 