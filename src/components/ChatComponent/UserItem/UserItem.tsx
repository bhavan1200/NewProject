import React, { useEffect, useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import Amplify, {DataStore, Hub, Auth, Predicates} from "aws-amplify";
import { User, Message, ChatRoom, ChatRoomUser } from '../../../models';


const UserItem = ({user}) => {

    const navigation = useNavigation();

    const onPress = async () => {
        //ToDo if there is already a chat room between
        //these two user then redirect to existing chatroom 
        //otherwise create new chatroom with these user

         const authUser = await Auth.currentAuthenticatedUser();
         const dbUser = await DataStore.query(User, authUser.attributes.sub)

         const existingChatRoom = await DataStore.query(ChatRoom)
         const existingChatRoomUser = (await DataStore.query(ChatRoomUser, existingChatRoom.id))
         .filter(existingChatRoomUser => existingChatRoomUser.user.id === user.id)
         
         console.log(existingChatRoomUser);
         
         if (existingChatRoomUser[0] !== undefined){
            navigation.navigate("ChatRoomScreen", {id: existingChatRoomUser[0].chatroom.id})
         } else {
             console.log("Geelo")
         }

        // const existingUser = await DataStore.query(ChatRoomUser, existingChatRoom.id)
        


        // Create a ChatRoom 
        // const newChatRoom = await DataStore.save(new ChatRoom({
        //     newMessage: 0,
        // }));

        //connect auth user with the chatroom
        // const authUser = await Auth.currentAuthenticatedUser();
        // const dbUser = await DataStore.query(User, authUser.attributes.sub)
        // await DataStore.save(new ChatRoomUser({
        //     user: dbUser,
        //     chatroom: newChatRoom,

        // }))
         
        //connect clicked user with the chatroom
        // await DataStore.save(new ChatRoomUser({
        //     user,
        //     chatroom: newChatRoom,
        // }))
        
        // navigation.navigate("ChatRoomScreen", {id: newChatRoom.id})
    }
    
    return (
        <Pressable onPress={onPress} style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={{
                        uri: user.imageUri}} 
                        style={styles.image} 
                    />
                </View>

                <View style={styles.rightContainer}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{user.name}</Text>
                    </View>
                </View>
            </Pressable>

    )
}

export default UserItem;
