import React, { useState, useEffect } from 'react';
import {View, StyleSheet, FlatList, Text, Pressable} from 'react-native';
import ChatRoomItem from "../../components/ChatComponent/ChatRoomItem";
import { ChatRoomUser, ChatRoom, User } from "../../../src/models"
import { DataStore, Auth } from "aws-amplify"
import ChatRooms from "../../data/ChatRooms"




const ChatScreen = () => {

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]); 

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
      renderItem={({item}) => <ChatRoomItem chatRoom={item} /> }
      showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default ChatScreen;
