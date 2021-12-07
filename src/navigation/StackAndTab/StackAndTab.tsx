import React from 'react';
import {View, Text, Image, useWindowDimensions,} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from '../Tab';
import ChatRoomScreen from '../../screens/ChatScreen/ChatRoomScreen';
import UsersScreen from '../../screens/ChatScreen/UsersScreen';
import Feather from 'react-native-vector-icons/Feather';
import ChatRoomHeader from "../Header/ChatRoomHeader"
import HomeHeader from "../Header/HomeHeader"

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
        options={({route}) => ({
          headerTitle: () => <ChatRoomHeader id={route.params?.id}/>,
          headerBackTitleVisible: false
        })}
      />
      <RootStack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={({route}) => ({
          headerTitle: () => <ChatRoomHeader id={route.params?.id}/>,
          headerBackTitleVisible: false
        })}
      />
    </RootStack.Navigator>
  );
};


export default StackAndTab;