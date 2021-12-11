import React,{useState, useEffect} from  'react'
import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import styles from "./styles";
import { useSelector } from 'react-redux';
import { ChatRoom, User, ChatRoomUser } from "../../../models";
import { Message as MessageModel } from "../../../models";
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';
import {S3Image} from 'aws-amplify-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Message = (props) => {
  
  const [message, setMessage] = useState<MessageModel>(props.message)
  const [user, setUser] = useState<User|undefined>();
  const [isMe, setIsMe] = useState<boolean | null>(null);

  const {width} = useWindowDimensions();

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser)
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel, message.id).subscribe((msg) => {
      // console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "UPDATE") {
        setMessage((message) => ({...message, ...msg.element}));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setAsRead();
  }, [isMe, message])

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

  const setAsRead = async () => {
     if(isMe === false && message.status !== "READ"){
       await DataStore.save(MessageModel.copyOf(message, (updated) => {
         updated.status = "READ";
       }))
     }
  }

  if(!user){
    return(
      <ActivityIndicator />
    )
  }

  return (
    <View style={[
      styles.container, 
      isMe ? styles.rightContainer : styles.leftContainer
    ]}>
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
  )
}

export default Message;
