import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from "../../../screens/ChatScreen";
import UsersScreen from "../../../screens/ChatScreen/UsersScreen";
import  ChatScreenHeader from "../../Header/ChatScreenHeader"

const ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
              name="ChatScreen" 
              component={ChatScreen}
              options={{ 
                headerTitle: ChatScreenHeader,
                headerTitleAlign: "center"
              }}
            />
            <ChatStack.Screen
              name="UsersScreen" 
              component={UsersScreen}
              options={{ 
                
              }}
            />
        </ChatStack.Navigator>
    )
}

export default ChatStackScreen;
