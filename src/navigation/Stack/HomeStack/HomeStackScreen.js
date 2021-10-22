import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../../../screens/HomeScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
              name="HomeScreen" 
              component={HomeScreen}
              options={{ 
                headerTitle:" Messenger",
                headerTitleAlign: "center"
              }}
            />
        </HomeStack.Navigator>    )
}

export default HomeStackScreen;
