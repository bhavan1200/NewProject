import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import store from './src/App/store';
import {Provider} from 'react-redux';
import Amplify, {DataStore, Hub, Auth} from "aws-amplify";
import config from "./src/aws-exports"
import { Message } from "./src/models"
import { withAuthenticator } from "aws-amplify-react-native"

import StackAndTab from './src/navigation/StackAndTab';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

Amplify.configure(config);

const AppStack = createNativeStackNavigator();

const AppSupporter = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen
          name="StackAndTab"
          component={StackAndTab}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {


  return (
    <Provider store={store}>
      <AppSupporter />
    </Provider>
  );
};

export default withAuthenticator(App) ;
