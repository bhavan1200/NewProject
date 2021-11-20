import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { User } from "../../../models"
import {View, Text, ActivityIndicator, useWindowDimensions} from 'react-native';
import { S3Image } from "aws-amplify-react-native"
import styles from './styles';

const blue = '#3777f0';
const grey = 'lightgrey';

const myID = "u1"

const Message = ({ message }) => {

  const { width } = useWindowDimensions()
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
    <View style={[
        styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
        {message.image && (
          <View style={{marginBottom: message.content ? 5 : -20}}>
            <S3Image 
              imgKey={message.image} 
              style={{width: width * 0.7, 
              aspectRatio: 4 / 3 }}
              resizeMode = "cover"
            />
          </View>
          
        )}
      <Text style={{color: isMe ? 'black' : '#fff'}}>{message.content}</Text>
    </View>
  );
};

export default Message;
