import React from 'react';
import {View, Text, Image, useWindowDimensions,} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from '../Tab';
import ChatRoomScreen from '../../screens/ChatScreen/ChatRoomScreen';
import Feather from 'react-native-vector-icons/Feather';

const RootStack = createNativeStackNavigator();

const StackAndTab = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Root"
        component={Tab}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{
          headerTitle: ChatRoomHeader,
          headerBackTitleVisible: false
        }}
      />
    </RootStack.Navigator>
  );
};

const ChatRoomHeader = (props) => {

  const { width } = useWindowDimensions();

  return(
    <View style={{
      flexDirection: "row", 
      justifyContent: 'space-between', 
      width: width - 35,
      marginLeft: -30,
      alignItems: "center"
    }}>
      <Image
        style={{width: 30, height: 30, borderRadius: 30}} 
        source={{uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg"}}
      />
      <Text style={{flex: 1, marginLeft: 13, fontWeight: "bold"}}>{props.children}</Text>
      <View style={{flexDirection: "row"}}>
      <Feather name="camera" size={24} color="black" style={{marginHorizontal: 7,}}/>
      <Feather name="edit-2" size={24} color="black" style={{marginHorizontal: 18,}}/>
      </View>
    </View>
    
  )
}

export default StackAndTab;