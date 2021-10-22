import React, {useState, useEffect} from 'react';
import {Text, Image, View, Pressable, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {DataStore} from '@aws-amplify/datastore';
import {ChatRoomUser, User, Message} from '../../../models';
import styles from './styles';
import Auth from '@aws-amplify/auth';
import moment from 'moment';



const UserItem = ({ user }) => {
  

  const navigation = useNavigation();


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const fetchedUsers = (await DataStore.query(ChatRoomUser))
  //       .filter((chatRoomUser) => chatRoomUser.chatroom.id === chatRoom.id)
  //       .map((chatRoomUser) => chatRoomUser.user);

  //     // setUsers(fetchedUsers);

  //     const authUser = await Auth.currentAuthenticatedUser();
  //     setUser(
  //       fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
  //     );
  //     setIsLoading(false);
  //   };
  //   fetchUsers();
  // }, []);

  // useEffect(() => {
  //   if (!chatRoom.chatRoomLastMessageId) {
  //     return;
  //   }
  //   DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(
  //     setLastMessage
  //   );
  // }, []);

  const onPress = () => {
    //create a chatromm with user
  };

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }



  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: user.imageUri}}
        style={styles.image}
      />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name }</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UserItem;
