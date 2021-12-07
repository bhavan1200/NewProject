import React from 'react'
import { View, Text } from 'react-native';
import styles from "./styles";
import { useSelector } from 'react-redux'

const myID = "u1";

const Message = ({message}) => {

  const isMe = message.user.id === myID;

  return (
    <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{color: isMe ? "black" : "#fff"}}>{message.content}</Text>
    </View>
  )
}

export default Message;
