import React from 'react'
import { View, Text, Image, useWindowDimensions, } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainChatScreen from '../../../screens/ChatScreen/MainChatScreen';
import Feather from 'react-native-vector-icons/Feather';



const ChatStack = createNativeStackNavigator();

const ChatStackScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
              name="MainChatScreen" 
              component={MainChatScreen}
              options={{ 
                headerTitle:MainChatScreenHeader,
                headerTitleAlign: "center"
              }}
            />
        </ChatStack.Navigator>
    )
}

const MainChatScreenHeader = (props) => {

  const { width } = useWindowDimensions();

  return(
    <View style={{
      flexDirection: "row", 
      justifyContent: 'space-between', 
      width: width - 10,
      alignItems: "center"
    }}>
      <Image
        style={{width: 30, height: 30, borderRadius: 30}} 
        source={{uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"}}
      />
      <Text style={{flex: 1, textAlign: "center", marginLeft: 30, fontWeight: "bold"}}>Messenger</Text>
      <View style={{flexDirection: "row"}}>
      <Feather name="camera" size={24} color="black" style={{marginHorizontal: 7,}}/>
      <Feather name="edit-2" size={24} color="black" style={{marginHorizontal: 18,}}/>
      </View>
    </View>
    
  )
}

export default ChatStackScreen;
