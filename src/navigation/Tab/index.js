import React from 'react'
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from '../Stack/HomeStack/HomeStackScreen';
import ChatStackScreen from '../Stack/ChatStack/ChatStackScreen';

import PostStackScreen from '../Stack/PostStack';
import ShoppingStackScreen from '../Stack/ShoppingStack';

import ShoppingScreen from '../../screens/ShoppingScreen';
import ProfileScreen from '../../screens/ProfileScreen';


import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Tab = createBottomTabNavigator();


const index = () => {
    return (
        <Tab.Navigator
           initialRouteName= "ChatStackScreen"
           screenOptions={({route}) => ({
               tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeStackScreen') {
              iconName = focused
                ? 'home-outline'
                : 'home';
                return <Ionicons name={iconName} size={size} color={color} />
            }
            if (route.name === 'ChatStackScreen') {
              iconName = focused ? 'search-minus' : 'search-plus';
              return <FontAwesome name={iconName} size={size} color={color} />
            }
            if (route.name === 'PostStackScreen') {
              iconName = focused ? 'plus-square-o' : 'plus-square';
              return <FontAwesome name={iconName} size={size} color={color} />
            }
            if (route.name === 'ShoppingStackScreen') {
              iconName = focused ? 'notifications-circle-outline' : 'notifications-circle';
              return <Ionicons name={iconName} size={size} color={color} />
            }
            if (route.name === 'ProfileScreen') {
              iconName = focused ? 'person-circle-outline' : 'person-circle';
              return <Ionicons name={iconName} size={size} color={color} />
            }

          },
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: '#000',
          tabBarShowLabel: false,
        })}
        >
            <Tab.Screen name="HomeStackScreen" component={HomeStackScreen}/>
            <Tab.Screen name="ChatStackScreen" component={ChatStackScreen}/>
            <Tab.Screen name="PostStackScreen" component={PostStackScreen}/>
            <Tab.Screen name="ShoppingStackScreen" component={ShoppingStackScreen}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}/>
        </Tab.Navigator> 
    )
}

export default index;
