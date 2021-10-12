import React, { useEffect, useState, useRef } from "react";
import {View, Text, TextInput, Button } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context";

import Amplify, { DataStore, Hub, Auth } from "aws-amplify";

import TabAndStack from "./src/navigation/StackAndTab";
import SignIn from "./src/screens/SignInScreen"
import OnBoardingScreen from "./src/screens/OnBoardinScreen"

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator();


Amplify.configure({
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_KF4Wtz8Lw",
    userPoolWebClientId: "40nqoo1vvckmuc5t9bv81ak3q3",
  },
});


const App = () => {

  return (
    <View>
      <SignIn/>
   
     <NavigationContainer>
       <AppStack.Screen name="LogIn" component={SignIn} />
     </NavigationContainer>
     </View>
  );
}

export default App;

