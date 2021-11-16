import React,{useState} from  'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { ChatRoom, User, ChatRoomUser, Message } from "../../../models"
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';


const MessageInput = ({ chatRoom}) => {


    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        const user = await Auth.currentAuthenticatedUser()
        const newMessage = await DataStore.save( new Message({
            content:message,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))
        updateLastMessage(newMessage)
        setMessage('');
    };

    const updateLastMessage = async (newMessage) => {
       DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
           updatedChatRoom.LastMessage = newMessage;
       }))
    }

    const onPlusClicked = () => {
       console.warn("OnPlusClicked")
    }

    const onPress = () => {
        if(message){
            sendMessage();
        } else{
            onPlusClicked()
        }
        
    }

    return (
        <KeyboardAvoidingView
          style={styles.root}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
            <View style={styles.inputContainer}>
                <SimpleLineIcons name="emotsmile" size={24} color="grey" style={styles.icon} />

                <TextInput
                  placeholder="Messages..." 
                  style={styles.input}
                  value={message}
                  onChangeText={setMessage}
                />

                <Feather name="camera" size={24} color="grey" style={styles.icon} />
                <MaterialCommunityIcons name="microphone-outline" size={24} color="grey" style={styles.icon} />
            </View>
            <Pressable onPress={onPress} style={styles.buttonContainer}>
            {message ? <Ionicons name="send" size={18} color="#fff" style={styles.icon} />
             : <AntDesign name="plus" size={24} color="#fff" style={styles.icon} />}
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default MessageInput
