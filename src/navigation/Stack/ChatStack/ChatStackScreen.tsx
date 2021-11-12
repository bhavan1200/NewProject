import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainChatScreen from '../../../screens/ChatScreen/MainChatScreen';

const ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
              name="MainChatScreen" 
              component={MainChatScreen}
              options={{ 
                headerTitle:" Messenger",
                headerTitleAlign: "center"
              }}
            />
        </ChatStack.Navigator>
    )
}

export default ChatStackScreen;
