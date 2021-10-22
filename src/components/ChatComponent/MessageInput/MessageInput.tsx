import React, {useState} from 'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import styles from "./styles";


import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const MessageInput = () => {

    const sendMessage = () => {
        console.log("sending : ", message );

        setMessage(" ");
    }

    const onPlusClicked = () => {
         console.warn("onPlusClicked")
    }

    const onPress = () => {
        if(message){
            sendMessage();
        }else {
            onPlusClicked()
        }
    }

    const [message, setMessage] = useState(' ');
    // console.warn(message)
    return (
        <KeyboardAvoidingView 
          behavior={Platform.os === "ios" ? "padding" : "height"} 
          style={styles.root}
          keyboardVerticalOffset={100}
        >
        <View style={styles.inputContainer}>
          <SimpleLineIcons name="emotsmile" size={24} color="grey" style={styles.icon}/>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Messages..."
        />
          <Feather name="camera" size={24} color="grey" style={styles.icon}/>          
          <MaterialCommunityIcons name="microphone-outline" size={24} color="grey" style={styles.icon}/>
        </View>
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          {message ? (
            <Ionicons name="send" size={18} color="white" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Pressable>
        </KeyboardAvoidingView>
    )
}

export default MessageInput
