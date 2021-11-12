import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import ChatRoomItem from '../../../Components/chatComponent/ChatRoomItem';
import styles from "./styles"

const MainChatScreen = () => {

    const chatRoomsData = useSelector(state => state.chatRooms)

    return (
        <View style={styles.page}>
           <FlatList 
             data={chatRoomsData}
             renderItem={({item}) => <ChatRoomItem chatRoom={item}/>}
             showsVerticalScrollIndicator={false}
            />
        </View>
    )
}


export default MainChatScreen;
