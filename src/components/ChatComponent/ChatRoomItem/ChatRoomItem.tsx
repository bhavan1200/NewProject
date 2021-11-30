import React from 'react'
import { View, Text, Image } from 'react-native';
import styles from "./styles";

const ChatRoomItem = ({chatRooms}) => {
    

    const user = chatRooms.users[1]
    return (
        <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={{
                        uri: user.imageUri}} 
                        style={styles.image} 
                    />
                </View>

                {chatRooms.newMessages && <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{chatRooms.newMessages}</Text>
                </View>}

                <View style={styles.rightContainer}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.text}>{chatRooms.lastMessage.createdAt}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={styles.text}>{chatRooms.lastMessage.content}</Text>
                    </View>
                </View>
            </View>

    )
}

export default ChatRoomItem;
