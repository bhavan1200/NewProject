import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { User, Message as MessageModel } from "../../../models"
import {View, Text, ActivityIndicator, useWindowDimensions} from 'react-native';
import { S3Image } from "aws-amplify-react-native"
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';


const blue = '#3777f0';
const grey = 'lightgrey';

const myID = "u1"

const Message = (props) => {

  const [message, setMessage] = useState<MessageModel>(props.message)
  const [user, setUser] = useState<User|undefined>();
  const [isMe, setIsMe] = useState<boolean | null>(null);

  const { width } = useWindowDimensions();

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser)
  }, []);

  useEffect(() => {
        const subscription = DataStore.observe(MessageModel, message.id).subscribe((msg) => {
//   console.log(msg.model, msg.opType, msg.element);
  if(msg.model === MessageModel && msg.opType === "UPDATE"){
      setMessage((message) => ({...message, ...msg.element}))
  }
  });
  return() => subscription.unsubscribe();
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
         updated.status === "READ";
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
        styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
        <View style={{flexDirection: "column"}}>
        {message.image && (
          <View style={{marginBottom: message.content ? 10 : -17}}>
            <S3Image 
              imgKey={message.image} 
              style={{width: width * 0.65, 
              aspectRatio: 4 / 3 }}
              resizeMode = "cover"
            />
          </View>
          
        )}
      <Text style={{color: isMe ? 'black' : '#fff'}}>{message.content}</Text>
      </View>
      {isMe && !!message.status !== null && message.status !== "SENT" &&
        (<Ionicons 
          name={ message.status === "DELIVERED" ? "checkmark" : "checkmark-done"} 
          size={18} color="black" 
          style={{marginHorizontal: 5}}
        />)}
    </View>
  );
};

export default Message;
