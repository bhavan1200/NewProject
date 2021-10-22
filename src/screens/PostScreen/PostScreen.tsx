import React from 'react'
import { View, Text, Button } from 'react-native';
import styles from "./styles";
import Amplify, { DataStore, Hub, Auth } from "aws-amplify";


const PostScreen = () => {
    return (
        <View>
            <Button
            title="Sign out"
            onPress={() => {
              Auth.signOut();
            }}
          />
        </View>
    )
}

export default PostScreen
