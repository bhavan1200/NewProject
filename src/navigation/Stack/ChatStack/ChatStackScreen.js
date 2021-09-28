import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from "../../../screens/ChatScreen"

ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
              name="ChatScreen" 
              component={ChatScreen}
              options={{ 
                headerTitle:" Messenger",
                headerTitleAlign: "center"
              }}
            />
        </ChatStack.Navigator>
    )
}

export default ChatStackScreen;
