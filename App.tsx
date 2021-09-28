import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify, { DataStore, Hub, Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import config from "./src/aws-exports";
import { NavigationContainer } from '@react-navigation/native';
import moment from "moment";
import TabAndStack from "./src/navigation/StackAndTab";


const App = () => {

  
 
 
  return (
    <NavigationContainer>
      <TabAndStack />
    </NavigationContainer>
  )
}

export default App;
