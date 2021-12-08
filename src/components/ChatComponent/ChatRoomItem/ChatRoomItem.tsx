import React, { useEffect, useState } from 'react'
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import styles from "./styles";
import Amplify, {DataStore, Hub, Auth, Predicates} from "aws-amplify";
import { User, Message, ChatRoom, ChatRoomUser } from '../../../models';
import { useNavigation } from '@react-navigation/native';

const ChatRoomItem = ({chatRooms}) => {

    // const [users, setUsers] = useState<Users[]>([])//All users in the chatroom
    const [user, setUser] = useState<Users|null>(null)//Display User

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("ChatRoomScreen", { id: chatRooms.id})
    }

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUsers = (await DataStore.query(ChatRoomUser))
            .filter(chatRoomUsers => chatRoomUsers.chatroom.id === chatRooms.id)
            .map(chatRoomUsers => chatRoomUsers.user);
            
            const authUser = await Auth.currentAuthenticatedUser();
            setUser(fetchedUsers.find(user => user.id !== authUser.attributes.sub) || null);
        }
        fetchUser();
    }, [])

    if(!user){
        return(
            <ActivityIndicator />
        )
    }
    return (
        <Pressable onPress={onPress} style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={{
                        uri: user.imageUri}} 
                        style={styles.image} 
                    />
                </View>

                {!!chatRooms.newMessages && <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{chatRooms.newMessages}</Text>
                </View>}

                <View style={styles.rightContainer}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.text}>{chatRooms.lastMessage?.createdAt}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={styles.text}>{chatRooms.lastMessage?.content}</Text>
                    </View>
                </View>
            </Pressable>

    )
}

export default ChatRoomItem;
