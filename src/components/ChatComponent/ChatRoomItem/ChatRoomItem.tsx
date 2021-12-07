import React from 'react'
import { View, Text, Image, Pressable } from 'react-native';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const ChatRoomItem = ({chatRooms}) => {
    const user = chatRooms.users[1];

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("ChatRoomScreen", { id: chatRooms.id})
    }
    return (
        <Pressable onPress={onPress} style={styles.container}>

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
            </Pressable>

    )
}

export default ChatRoomItem;
