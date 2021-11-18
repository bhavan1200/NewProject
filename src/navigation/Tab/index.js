import React from 'react'
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from '../Stack/HomeStack/HomeStackScreen';
import ChatStackScreen from '../Stack/ChatStack/ChatStackScreen';
import DiscoveryScreen from "../../screens/Discovery"
import ProfileScreen from "../../screens/ProfileScreen"
import NotiFicationScreen from "../../screens/NotificationScreen"
import PostStackScreen from '../Stack/PostStack';
import ShoppingStackScreen from '../Stack/ShoppingStack';
import PostScreen from '../../screens/PostScreen';
import ShoppingScreen from '../../screens/ShoppingScreen';


import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Tab = createBottomTabNavigator();


const index = () => {
    return (
        <Tab.Navigator
           initialRouteName= "ChatStack"
           screenOptions={({route}) => ({
             headerShown: false,
               tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeStack') {
              iconName = focused
                ? 'home-outline'
                : 'home';
                return <Ionicons name={iconName} size={size} color={color} />
            }
            if (route.name === 'PostStack') {
              iconName = focused ? 'search-minus' : 'search-plus';
              return <FontAwesome name={iconName} size={size} color={color} />
            }
            if (route.name === 'ChatStack') {
              iconName = focused ? 'plus-square-o' : 'plus-square';
              return <FontAwesome name={iconName} size={size} color={color} />
            }
            if (route.name === 'ShoppingStack') {
              iconName = focused ? 'notifications-circle-outline' : 'notifications-circle';
              return <Ionicons name={iconName} size={size} color={color} />
            }
            if (route.name === 'Profile') {
              iconName = focused ? 'person-circle-outline' : 'person-circle';
              return <Ionicons name={iconName} size={size} color={color} />
            }

          },
          
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: '#000',
          tabBarShowLabel: false,
        })}
        >
            <Tab.Screen name="HomeStack" component={HomeStackScreen}/>
            <Tab.Screen name="ChatStack" component={ChatStackScreen}/>
            <Tab.Screen name="PostStack" component={PostStackScreen}/>
            <Tab.Screen name="ShoppingStack" component={ShoppingStackScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator> 
    )
}

export default index;