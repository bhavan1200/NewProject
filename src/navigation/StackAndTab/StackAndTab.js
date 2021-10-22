import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from '../Tab';
import ChatRoomHeader from "../Header/ChatRoomHeader"
import ChatRoomScreen from '../../screens/ChatScreen/ChatRoomScreen';
import UserScreen from "./../../screens/ChatScreen/UsersScreen";

import OnBoardingScreen from "./../../screens/OnBoardinScreen"


const RootStack = createNativeStackNavigator();

const StackAndTab = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
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
        }}
      />
      {/* <RootStack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerTitle: ChatRoomHeader,
        }}
      /> */}
    </RootStack.Navigator>
  );
};

export default StackAndTab;
