import React, { useEffect, useState } from 'react'
import {View, Text, Image, useWindowDimensions,} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import Feather from 'react-native-vector-icons/Feather';
import { User, ChatRoomUser } from "../../models"



const ChatRoomHeader = (props) => {


 const [user, setUser] = useState<User|null>(null); 

  const { width } = useWindowDimensions();

  useEffect(() => {
        const fetchUsers = async () => {
          const fetchedUsers = (await DataStore.query(ChatRoomUser))
          .filter(chatRoomUser => chatRoomUser.chatroom.id === id)
          .map(chatRoomUser => chatRoomUser.user);

        //   setUsers(fetchedUsers);
          const authUser = await Auth.currentAuthenticatedUser();
          setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null)
        }
        fetchUsers();
    }, []);


  return(
    <View style={{
      flexDirection: "row", 
      justifyContent: 'space-between', 
      width: width - 35,
      marginLeft: -30,
      alignItems: "center"
    }}>
      <Image
        style={{width: 30, height: 30, borderRadius: 30}} 
        source={{uri: user?.imageUri}}
      />
      <Text style={{flex: 1, marginLeft: 13, fontWeight: "bold"}}>Yup</Text>
      <View style={{flexDirection: "row"}}>
      <Feather name="camera" size={24} color="black" style={{marginHorizontal: 7,}}/>
      <Feather name="edit-2" size={24} color="black" style={{marginHorizontal: 18,}}/>
      </View>
    </View>
    
  )
}

export default ChatRoomHeader
