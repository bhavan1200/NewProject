import React, { useState, useEffect } from 'react';
import {View, StyleSheet, FlatList, Text, Pressable} from 'react-native';
import ChatRoomItem from "../../../components/ChatComponent/ChatRoomItem";
import { ChatRoomUser, ChatRoom, User } from "../../../models"
import { DataStore, Auth } from "aws-amplify"
import ChatRooms from "../../../data/Users"
import UserItem from "../../../components/ChatComponent/UserItem";




const UserScreen = () => {


  // useEffect(() => {
  //  const fetchChatRooms = async () => {
  //    const fetchedChatRooms = await DataStore.query(ChatRoom)
  //  }
  //  fetchChatRooms();
  // }, [])

   return (
    <View>
      <FlatList 
      data={ChatRooms}
      renderItem={({item}) => <UserItem user={item} /> }
      showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default UserScreen;
