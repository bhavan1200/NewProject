import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainChatScreen from "../../../screens/ChatScreen/MainChatScreen";
import HomeChatScreen from '../../../screens/ChatScreen/HomeChatScreen';
import HomeHeader from "../../Header/HomeHeader"



const ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen 
              name="HomeChatScreen" 
              component={HomeChatScreen}
              options={({route}) => ({
          headerTitle: () => <HomeHeader id={route.params?.id}/>,
          headerBackTitleVisible: false
        })}
            />
        </ChatStack.Navigator>
    )
}

export default ChatStackScreen;