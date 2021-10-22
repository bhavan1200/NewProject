import React from 'react'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import Message from "../../../components/ChatComponent/Message"
import MessageInput from "../../../components/ChatComponent/MessageInput"
import styles from "./styles";
import  chatRoomData from "../../../data/Chats";
import {useRoute} from '@react-navigation/core';


const ChatRoomScreen = () => {
  const route = useRoute();
  // console.warn(route.params?.id)
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
         data={chatRoomData.messages}
         renderItem={({item}) => <Message message={item}/>}
         inverted
       />
       <MessageInput />
    </SafeAreaView>
  )
}


export default ChatRoomScreen
