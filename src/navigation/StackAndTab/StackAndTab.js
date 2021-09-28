import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from '../Tab';
import ChatRoomScreen from '../../screens/ChatScreen/ChatRoomScreen';

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
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default StackAndTab;
