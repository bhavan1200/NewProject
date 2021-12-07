import React, { useEffect, useState } from 'react'
import {View, Text, Pressable, Image, useWindowDimensions,} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import Feather from 'react-native-vector-icons/Feather';
import { User, ChatRoomUser } from "../../models";
import { useNavigation } from '@react-navigation/native';

const HomeHeader = (props) => {

    const {width, height} = useWindowDimensions();

    const navigation = useNavigation();

    console.log(navigation);

    return (
        <View style={{
            flexDirection: "row", 
            justifyContent: 'space-between', 
            width,
            padding: 5,
            alignItems: "center"
        }}>
      <Image
        style={{width: 30, height: 30, borderRadius: 30}} 
        source={{uri: "https://picsum.photos/200/300"}}
      />
      <Text style={{flex: 1, textAlign:"center", marginLeft: 20, fontWeight: "bold"}}>Insta</Text>
      <View style={{flexDirection: "row"}}>
        <Feather name="camera" size={24} color="black" style={{marginHorizontal: 5,}}/>
        <Pressable onPress={() => navigation.navigate("UsersScreen")}>
          <Feather name="edit-2" size={24} color="black" style={{marginHorizontal: 20,}}/>
        </Pressable>
        
      </View>
    </View>
    )
}

export default HomeHeader
