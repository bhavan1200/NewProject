import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons"



const myID = "u1";

const Message = ({message}) => {
    const isMe = message.user.id === myID;
    return (
    <Pressable
       style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <View style={styles.row}>
          <View style={{ marginBottom: message.content ? 10 : 0 }}>
          </View>
          <Text style={{ color: isMe ? "black" : "white" }}>{message.content}</Text>
      </View>
    </Pressable>
    )
}

export default Message
