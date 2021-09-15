import React from 'react'
import { View, Text } from 'react-native';
import { withAuthenticator } from "aws-amplify-react-native";
import config from "./src/aws-exports";
import Amplify, { DataStore, Hub, Auth } from "aws-amplify";


Amplify.configure(config);


const App = () => {
  return (
    <View>
      <Text>App.js qhw</Text>
    </View>
  )
}

export default withAuthenticator(App);
