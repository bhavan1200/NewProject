import React,{useState, useEffect} from  'react'
import { View, Text, ActivityIndicator } from 'react-native';
import styles from "./styles";
import { useSelector } from 'react-redux';
import { ChatRoom, User, ChatRoomUser } from "../../../models";
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';


const myID = "u1";

const Message = ({message}) => {

  const [user, setUser] = useState<User|undefined>();
  const [isMe, setIsMe] = useState<boolean>(false)

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
      <Text style={{color: isMe ? "black" : "#fff"}}>{message.content}</Text>
    </View>
  )
}

export default Message;
