import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useSelector } from 'react-redux'
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import Message from '../../../Components/chatComponent/Message';
import styles from "./styles";
import MessageInput from '../../../Components/chatComponent/MessageInput';

const ChatRoomScreen = () => {

    const route = useRoute();
    const navigation = useNavigation()
    console.warn(route.params?.id);
    navigation.setOptions({ title: "Elon Musk"})

    const chatRoomsData = useSelector(state => state.chats)
    return (
        <SafeAreaView style={styles.page}>
            <FlatList 
              data={chatRoomsData.messages}
              renderItem={({item}) => <Message message={item}/>}
              inverted
            />
            <MessageInput />
        </SafeAreaView>
    )
}

export default ChatRoomScreen;
