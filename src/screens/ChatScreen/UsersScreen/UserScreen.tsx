import React, { useState, useEffect } from 'react';
import {View, StyleSheet, FlatList, Text, Pressable} from 'react-native';
import ChatRoomItem from "../../../components/ChatComponent/ChatRoomItem";
import { ChatRoomUser, ChatRoom, User } from "../../../models"
import { DataStore, Auth } from "aws-amplify"
import UserItem from "../../../components/ChatComponent/UserItem";




const UserScreen = () => {

   const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers)
  }, []);


  // useEffect(() => {
  //  const fetchUsers = async () => {
  //    const fetchedUsers = await DataStore.query(User);
  //       setUsers(fetchedUsers)
  //  }
  //  fetchUsers();
  // }, [])


   return (
    <View>
      <FlatList 
      data={users}
      renderItem={({item}) => <UserItem user={item} /> }
      showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default UserScreen;
