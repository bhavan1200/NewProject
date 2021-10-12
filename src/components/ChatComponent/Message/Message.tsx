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





const Message = ({message}) => {
    const isMe = true;
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
          <Text style={{ color: isMe ? "black" : "white" }}></Text>
      </View>
    </Pressable>
    )
}

export default Message
