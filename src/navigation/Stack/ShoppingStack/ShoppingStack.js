import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingScreen from "../../../screens/ShoppingScreen"


const ShoppingStack = createNativeStackNavigator();

const ShoppingStackScreen = () => {
    return (
        <ShoppingStack.Navigator>
            <ShoppingStack.Screen name="ShoppingScreen" component={ShoppingScreen} />
        </ShoppingStack.Navigator>
    )
}

export default ShoppingStackScreen;
