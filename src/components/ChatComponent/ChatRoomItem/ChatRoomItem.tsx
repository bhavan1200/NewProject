import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { ChatRoom, User, ChatRoomUser } from "../../../models"
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import styles from './styles';

const ChatRoomItem = ({ chatRoom }) => {
    
    //const [users, setUsers] = useState<User[]>([]); //All users in the chatroom
    const [user, setUser] = useState<User | null>(null); //The Display User

    const navigation = useNavigation();



    useEffect(() => {
        const fetchUsers = async () => {
          const fetchedUsers = (await DataStore.query(ChatRoomUser))
          .filter(chatRoomUser => chatRoomUser.chatroom.id === chatRoom.id)
          .map(chatRoomUser => chatRoomUser.user);

        //   setUsers(fetchedUsers);
          const authUser = await Auth.currentAuthenticatedUser();
          setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null)
        }
        fetchUsers();
    }, [])

    const onPress = () => {
        navigation.navigate("ChatRoomScreen", { id: chatRoom.id })
    };

    if(!user){
        return(
            <ActivityIndicator />
        )
    }

    // console.log(chatRoom);

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View>
                <Image source={{uri: user.imageUri}} style={styles.image}/>
            </View>
            
            {!!chatRoom.newMessage && <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{chatRoom.newMessage}</Text>
            </View>}

            <View style={styles.rightContainer}>
               <View style={styles.row}>
                   <Text style={styles.name}>{user.name}</Text>
                   <Text style={styles.text}>{chatRoom.lastMessage?.createdAt}</Text>
               </View>
               <Text numberOfLines={1} style={styles.text}>{chatRoom.lastMessage?.content}</Text>
            </View>
        </Pressable>
    )
}

export default ChatRoomItem
