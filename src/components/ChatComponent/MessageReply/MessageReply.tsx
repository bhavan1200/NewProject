import React,{useState, useEffect} from  'react'
import { View, Text, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native';
import styles from "./styles";
import { useSelector } from 'react-redux';
import { ChatRoom, User, ChatRoomUser, Message as MessageModel } from "../../../models";
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';
import {S3Image} from 'aws-amplify-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



const MessageReply = (props) => {

  const { message : propMessage } = props;
  
  const [message, setMessage] = useState<MessageModel>(propMessage);
  const [user, setUser] = useState<User|undefined>();
  const [isMe, setIsMe] = useState<boolean | null>(null);

  const {width} = useWindowDimensions();

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser)
  }, []);

  useEffect(() => {
    setMessage(propMessage)
  }, [propMessage]);


  useEffect(() => {
    const checkIfMe = async () => {
      if(!user){
        return;
      }
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub)
    }
    checkIfMe();
  }, [user]);

  if(!user){
    return(
      <ActivityIndicator />
    )
  }

  return (
    <View 
      style={[
        styles.container, 
        isMe ? styles.rightContainer : styles.leftContainer
      ]}
    >
    <View style={styles.row}>
      {message.image && (
        <View style={{marginBottom: message.content ? 10 : 0}}>
          <S3Image
                imgKey={message.image}
                style={{width: width * 0.65, aspectRatio: 4 / 3}}
            />
        </View>
      )}

      {!!message.content && (
        <Text style={{color: isMe ? "black" : "#fff"}}>{message.content}</Text>
      )}

      {isMe && !!message.status  && message.status !== "SENT" && (
        <Ionicons 
          name={message.status === "DELIVERED"? "checkmark" :"checkmark-done"} 
          size={20} 
          color="gray" 
          style={{marginHorizontal : 5}}
        />
      )}
    </View>
    </View>
  )
}

export default MessageReply;
