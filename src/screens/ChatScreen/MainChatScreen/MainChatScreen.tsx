import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import ChatRoomItem from '../../../Components/chatComponent/ChatRoomItem';
import styles from "./styles";
import { Auth } from "aws-amplify";


const MainChatScreen = () => {

    const chatRoomsData = useSelector(state => state.chatRooms);

    const logOut = () => {
        Auth.signOut();
    } 

    return (
        <View style={styles.page}>
           <FlatList 
             data={chatRoomsData}
             renderItem={({item}) => <ChatRoomItem chatRoom={item}/>}
             showsVerticalScrollIndicator={false}
            />
            <Pressable onPress={logOut} style={{
                backgroundColor: "red", 
                height:50, 
                borderRadius: 5, 
                margin: 10,
                justifyContent: "center",
                alignItems: "center",

            }}>
                <Text>LogOut</Text>
            </Pressable>
        </View>
    )
}


export default MainChatScreen;
