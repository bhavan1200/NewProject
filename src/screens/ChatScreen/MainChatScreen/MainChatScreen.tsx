import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { ChatRoom, ChatRoomUser } from "../../../models"
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import ChatRoomItem from '../../../Components/chatComponent/ChatRoomItem';
import styles from "./styles";


const MainChatScreen = () => {

    const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);

    const chatRoomsData = useSelector(state => state.chatRooms);

    useEffect(() => {
        const fetchChatRooms = async() => {
        const userData = await Auth.currentAuthenticatedUser();

        const chatRooms = (await DataStore.query( ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.user.id === userData.attributes.sub)
        .map(chatRoomUser => chatRoomUser.chatroom);

        setChatRoom(chatRooms)
        }
        fetchChatRooms();
    }, [])


    // const logOut = () => {
    //     Auth.signOut();
    // } 

    return (
        <View style={styles.page}>
           <FlatList 
             data={chatRoom}
             renderItem={({item}) => <ChatRoomItem chatRoom={item}/>}
             showsVerticalScrollIndicator={false}
            />
            {/* <Pressable onPress={logOut} style={{
                backgroundColor: "red", 
                height:50, 
                borderRadius: 5, 
                margin: 10,
                justifyContent: "center",
                alignItems: "center",

            }}>
                <Text>LogOut</Text>
            </Pressable> */}
        </View>
    )
}


export default MainChatScreen;
