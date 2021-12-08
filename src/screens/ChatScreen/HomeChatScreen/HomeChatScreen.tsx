import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native';
import ChatRoomItem from "../../../Components/chatComponent/ChatRoomItem"
import Amplify, {DataStore, Hub, Auth, Predicates} from "aws-amplify";
import { ChatRoom, ChatRoomUser } from '../../../models';
import styles from "./styles";
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux'

const HomeChatScreen = () => {

    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            const authUser = await Auth.currentAuthenticatedUser();

            const fetchedChatRooms = (await DataStore.query(ChatRoomUser))
              .filter(ChatRoomUser => ChatRoomUser.user.id === authUser.attributes.sub)
              .map(ChatRoomUser => ChatRoomUser.chatroom)
            setChatRooms(fetchedChatRooms);
            // console.log(fetchedChatRooms)
        }
        fetchChatRooms();
    }, [])

    const chatRoomData = useSelector((state) => state.chatRooms)

    // useEffect(() => {
    //    const fetchMessage = async () => {
    //        const fetchedMessage = await DataStore.query(Message, Predicates.ALL, {
    //           page: 0,
    //           limit: 10
    //         });
    //        console.log(fetchedMessage)
    //    }
    //    fetchMessage();
    // }, [])
    
    
    // const { height, width } = useWindowDimensions();
    // console.log(height, width);
    
    return (
        <View style={styles.page}>
            <FlatList 
              data={chatRooms}
              renderItem={({item}) => <ChatRoomItem chatRooms={item} /> }
              keyExtractor={item => item.id} 
              showsVerticalScrollIndicator={false}     
            />
        </View>
    )
}

export default HomeChatScreen;
