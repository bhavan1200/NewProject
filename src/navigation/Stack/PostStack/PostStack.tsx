import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from "../../../screens/PostScreen"

const PostStack = createNativeStackNavigator();

const PostStackScreen = () => {
    return (
        <PostStack.Navigator>
            <PostStack.Screen name="PostScreen" component={PostScreen} />
        </PostStack.Navigator>
    )
}

export default PostStackScreen;