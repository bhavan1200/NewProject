import React,{useState, useEffect} from  'react'
import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import styles from "./styles";
import { useSelector } from 'react-redux';
import { ChatRoom, User, ChatRoomUser } from "../../../models";
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';
import {S3Image} from 'aws-amplify-react-native';



const myID = "u1";

const Message = ({message}) => {

  const [user, setUser] = useState<User|undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);

  const {width} = useWindowDimensions();

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser)
  }, []);

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
    <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
    {message.image && (
      <View style={{marginBottom:3}}>
        <S3Image
              imgKey={message.image}
              style={{width: width * 0.70, aspectRatio: 4 / 3}}
          />
      </View>
    )}
    
      <Text style={{color: isMe ? "black" : "#fff"}}>{message.content}</Text>
    </View>
  )
}

export default Message;
