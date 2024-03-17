import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import App from '../(tabs)/index'; // Your initial screen for the index tab
import Alarm from '../Screens/Alarm'; // Another screen you want to navigate to
import Event from '../Screens/Event';
import QuickReminder from '../Screens/QuickReminder'

const IndexStack = createStackNavigator();

const IndexStackScreen = () => {
    return (
        <View>
          <Text>Index Screen</Text>
        </View>
      );
};

export default IndexStackScreen;