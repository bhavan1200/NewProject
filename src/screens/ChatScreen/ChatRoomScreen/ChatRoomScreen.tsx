import React from 'react'
import { View, Text } from 'react-native'
import Message from "../../../components/ChatComponent/Message"
import styles from "./styles";
import  message from "../../../data/Chats"

const ChatRoomScreen = () => {
  return (
    <View style={styles.page}>
      <Message message={message.messages[0]} />
    </View>
  )
}

export default ChatRoomScreen
