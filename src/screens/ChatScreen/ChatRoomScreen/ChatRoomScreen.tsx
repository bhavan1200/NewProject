import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Amplify, {DataStore, Hub, Auth, Predicates, SortDirection} from "aws-amplify";
import {Message as MessageModel } from '../../../models';
import { ChatRoom } from '../../../models';
import Message from "../../../Components/chatComponent/Message";
import MessageInput from "../../../Components/chatComponent/MessageInput";
import styles from "./styles";
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';


const ChatRoomScreen = () => {

  const [messages, setMessages] = useState<Message[]>([])
  const [chatRoom, setChatRoom] = useState<ChatRoom|null>(null)
  
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

   useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      // console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        setMessages((existingMessage) => [msg.element, ...existingMessage]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchChatRoom = async () => {
      if(!route.params.id){
        console.warn("no id provided")
        return;
      }
      const chatRoom = await DataStore.query(ChatRoom, route.params.id)
       if(!chatRoom){
        console.error("couldn't find chatroom with this id")
      }else {
        setChatRoom(chatRoom)
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
      setMessages(fetchedMessages);
    };
  

  if(!chatRoom){
    return(
      <ActivityIndicator />
    )
  }
  
  return (
    <View style={styles.page}>
        <FlatList 
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Message message={item} /> }
                showsVerticalScrollIndicator={false}  
                inverted   
        />
        <MessageInput chatRoom={chatRoom}/>

    </View>
  )
}

export default ChatRoomScreen
