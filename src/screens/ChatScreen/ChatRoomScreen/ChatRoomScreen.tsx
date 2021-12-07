import React from 'react'
import { View, Text, FlatList } from 'react-native';
import Message from "../../../Components/chatComponent/Message";
import MessageInput from "../../../Components/chatComponent/MessageInput";
import styles from "./styles";
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';


const ChatRoomScreen = () => {
  
  const route = useRoute();
  const navigation = useNavigation();
  
  navigation.setOptions({title: "Hello"})

  
  const chatRoomData = useSelector((state) => state.chats);
  
  return (
    <View style={styles.page}>
        <FlatList 
                data={chatRoomData.messages}
                renderItem={({item}) => <Message message={item} /> }
                keyExtractor={item => item.id} 
                showsVerticalScrollIndicator={false}  
                inverted   
        />
        <MessageInput />

    </View>
  )
}

export default ChatRoomScreen
