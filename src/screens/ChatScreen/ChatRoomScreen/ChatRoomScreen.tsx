import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { Message as MessageModel, ChatRoom } from "../../../models"
import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import Message from '../../../Components/chatComponent/Message';
import styles from "./styles";
import MessageInput from '../../../Components/chatComponent/MessageInput';
import { SortDirection } from "aws-amplify";

const ChatRoomScreen = () => {

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [chatRoom, setChatRoom] = useState<ChatRoom|null>(null);  


    const route = useRoute();
    const navigation = useNavigation()
    navigation.setOptions({ title: "Elon Musk"})

    useEffect(() => {
        fetchChatRoom();
    }, []);

    useEffect(() => {
       fetchMessages();
    }, [chatRoom]);


    useEffect(() => {
        const subscription = DataStore.observe(MessageModel).subscribe(msg => {
  console.log(msg.model, msg.opType, msg.element);
  if(msg.model === MessageModel && msg.opType === "INSERT"){
      setMessages(existingMessage => [msg.element, ...existingMessage])
  }
  });
  return() => subscription.unsubscribe();
    }, [])


    const fetchChatRoom = async () => {
        if(!route.params?.id){
            console.warn("No chatRoom Provided");
            return;
        }
        const chatRoom = await DataStore.query(ChatRoom, route.params.id);
        if(!chatRoom){
            console.error("Couldn't find chat room with thid id");
        } else{
            setChatRoom(chatRoom);
        }
    };

    const fetchMessages = async () => {
         if(!chatRoom){
           return;
       }
        const fetchedMessages = await DataStore.query(MessageModel, 
          message => message.chatroomID("eq", chatRoom?.id),
          {
              sort: message => message.createdAt(SortDirection.DESCENDING)
          }
        );
        setMessages(fetchedMessages)
    }

    if(!chatRoom){
        return(
            <ActivityIndicator />
        )
    }

    // const chatRoomsData = useSelector(state => state.chats)
    return (
        <SafeAreaView style={styles.page}>
            <FlatList 
              data={messages}
              renderItem={({item}) => <Message message={item}/>}
              inverted
            />
            <MessageInput chatRoom={chatRoom}/>
        </SafeAreaView>
    )
}

export default ChatRoomScreen;
