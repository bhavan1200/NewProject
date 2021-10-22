import React from 'react'
import { View, Text, Image, useWindowDimensions, Pressable } from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Feather from 'react-native-vector-icons/Feather';


const ChatRoomHeader = () => {
    const navigation = useNavigation();

    const {width} = useWindowDimensions()
    return (
        <View style={{
            flexDirection: "row", 
            justifyContent:"space-between", 
            width: width -60,
            marginLeft: "auto",
            padding: 10,
            alignItems: "center"
        }}>
            <Image
              style={{width:30, height:30, borderRadius:30}} 
              source={{uri: "https://picsum.photos/200/300" }}
            />
            <Text style={{flex: 1, fontWeight: "bold", textAlign: "center", marginLeft: 50}}>Messenger</Text>
            <Feather name="camera" size={24} color="grey" style={{marginHorizontal: 10}} />
            <Pressable onPress={() => navigation.navigate("UserScreen")}>
              <Feather name="edit-2" size={24} color="grey" style={{marginHorizontal: 10}}/>
            </Pressable>
        </View>
    )
}

export default ChatRoomHeader;
