import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainChatScreen from "../../../screens/ChatScreen/MainChatScreen";
import HomeChatScreen from '../../../screens/ChatScreen/HomeChatScreen';



const ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name="HomeChatScreen" component={HomeChatScreen} />
        </ChatStack.Navigator>
    )
}

export default ChatStackScreen;