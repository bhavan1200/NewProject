import React, { useEffect, useState } from 'react'
import {View, Text, Image, useWindowDimensions, Pressable} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import Feather from 'react-native-vector-icons/Feather';
import { User, ChatRoomUser, ChatRoom } from "../../models";
import moment from "moment";
import { useNavigation } from '@react-navigation/core';



const ChatRoomHeader = ({id, children}) => {

 const [user, setUser] = useState<User|null>(null); 
 const [allUsers, setAllUsers] = useState<User | []>([])
 const [chatRoom, setChatRoom] = useState<ChatRoom | undefined>(undefined)

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

    const fetchUsers = async () => {
            const fetchedUsers = (await DataStore.query(ChatRoomUser))
            .filter(chatRoomUser => chatRoomUser.chatroom.id === id)
            .map(chatRoomUser => chatRoomUser.user);

            setAllUsers(fetchedUsers);
            const authUser = await Auth.currentAuthenticatedUser();
            setUser(
              fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null
            );
    }

    const fetchChatRooms = async () => {
       DataStore.query(ChatRoom, id).then(setChatRoom)
    }

  useEffect(() => {
    if(!id){
      return;
    }
    fetchUsers();
    fetchChatRooms();
    }, []);
    

    const getLastOnlineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    }

    // if lastOnlineAt is less than 5 minutes ago, show him as ONLINE
    const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
    if (lastOnlineDiffMS < 5 * 60 * 1000) {
      // less than 5 minutes
      return "online";
    } else {
      return `Last seen online ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };

  const getUsernames = () => {
    return(
      allUsers.map(user => user.name).join(', ')
    ) 
  };

  const openInfo = () => {
    //Redirect to info page
    navigation.navigate("GroupInfoScreen", { id });
  }

  const isGroup = allUsers.length > 2;


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
        source={{uri: chatRoom?.imageUri || user?.imageUri}}
      />

      <Pressable onPress={openInfo} style={{flex: 1, marginLeft: 13,}}>
        <Text style={{  fontWeight: "bold"}}>{ chatRoom?.name || user?.name}</Text>
        <Text numberOfLines={1}>{ isGroup ? getUsernames() : getLastOnlineText()}</Text>
      </Pressable>
      
      <View style={{flexDirection: "row"}}>
      <Feather name="camera" size={24} color="black" style={{marginHorizontal: 7,}}/>
      <Feather name="edit-2" size={24} color="black" style={{marginHorizontal: 18,}}/>
      </View>
    </View>
    
  )
}

export default ChatRoomHeader
