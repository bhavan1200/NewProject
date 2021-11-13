import React from 'react';
import {View, Text, Button} from 'react-native';
import store from './src/App/store';
import {Provider} from 'react-redux';
import {Amplify} from "aws-amplify";
import config from "./src/aws-exports"
import { withAuthenticator } from "aws-amplify-react-native"

import StackAndTab from './src/navigation/StackAndTab';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

Amplify.configure(config);

const AppStack = createNativeStackNavigator();

const Message = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="StackAndTab"
          component={StackAndTab}
          options={{headerShown: false}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Message />
    </Provider>
  );
};

export default withAuthenticator(App) ;
