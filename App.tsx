import React from 'react';
import {View, Text, Button} from 'react-native';
import store from './src/App/store';
import {setMessage} from './src/Features/message/messageSlice';
import {decrement, increment} from './src/Features/counter/counterSlice';
import {Provider} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import PostList from './src/Features/posts/postList';

import StackAndTab from './src/navigation/StackAndTab';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

export default App;
