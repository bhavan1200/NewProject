import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles';

const ChatRoomItem = ({ chatRoom }) => {
    const user = chatRoom.users[1];

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("ChatRoomScreen", { id: chatRoom.id })
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View>
                <Image source={{uri: user.imageUri}} style={styles.image}/>
            </View>
            
            {chatRoom.newMessages && <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
            </View>}

            <View style={styles.rightContainer}>
               <View style={styles.row}>
                   <Text style={styles.name}>{user.name}</Text>
                   <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
               </View>
               <Text numberOfLines={1} style={styles.text}>{chatRoom.lastMessage.content}</Text>
            </View>
        </Pressable>
    )
}

export default ChatRoomItem
