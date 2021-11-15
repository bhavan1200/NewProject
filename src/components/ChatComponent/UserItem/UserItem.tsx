import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { ChatRoom, User, ChatRoomUser } from "../../../models"
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';

const UserItem = ({ user }) => {

    const navigation = useNavigation();

    const onPress = async () => {

        const authUser = await Auth.currentAuthenticatedUser();


         const chatRoom1 = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.user.id === authUser.attributes.sub)
      // .map(chatRoomUser => chatRoomUser.chatroom);

      const chatRoom2 = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.user.id === user.id)
      // .map(chatRoomUser => chatRoomUser.chatroom);

      const chatRooms = await [...chatRoom1, ...chatRoom2].filter((chatRoomUser) => chatRoomUser.user.id === user.id)
     .map(chatRoomUser => chatRoomUser.chatroom);

      if(chatRooms && chatRooms.length){
        navigation.navigate("ChatRoomScreen", { id: chatRooms[0].id });
        
      } else {

        //create a chatroom
        const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0}));

        //connect auth user with chatroom
        
        const dbUser = await DataStore.query(User, authUser.attributes.sub)
        await DataStore.save(new ChatRoomUser({
            user: dbUser,
            chatroom: newChatRoom,
        }))
        
        // connect clicked user with chatroom
        await DataStore.save(new ChatRoomUser({
            user,
            chatroom: newChatRoom,
        }));

        navigation.navigate("ChatRoomScreen", { id: newChatRoom.id})
    }};
    

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View>
                <Image source={{uri: user.imageUri || null}} style={styles.image}/>
            </View>

            <View style={styles.rightContainer}>
               <View style={styles.row}>
                   <Text style={styles.name}>{user.name}</Text>
               </View>
            </View>
        </Pressable>
    )
}

export default UserItem;
