import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/core";
import { ChatRoom, User, ChatRoomUser } from "../../../models";
import { Auth, SortDirection, DataStore } from "aws-amplify";
import styles from "./styles";
import UserItem from "../../../Components/chatComponent/UserItem";




const GroupInfoScreen = () => {
    const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
    const [allUsers, setAllUsers] = useState<User | []>([])

    const route = useRoute();

    
    useEffect(() => {
        fetchChatRoom();
        fetchUsers();
    }, []);

    const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id provided");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Couldn't find a chat room with this id");
    } else {
      setChatRoom(chatRoom);
    }
  };

  const fetchUsers = async () => {
        const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatroom.id === route.params?.id)
        .map(chatRoomUser => chatRoomUser.user);

        setAllUsers(fetchedUsers);
    };

    const confirmDelete = async (user) => {
        // check if authUser is admin of this group
        const authData = await Auth.currentAuthenticatedUser();
        if(chatRoom?.Admin?.id !== authData.attributes.sub){
            Alert.alert("You are not admin of this group");
            return;
        }
        
        if(user.id === chatRoom?.Admin?.id){
            Alert.alert("You'r the Admin, you can't delete yourself");
            return;
        }
        Alert.alert(
            "Confirm Delete",
            `Are you sure you want to delete ${user.name} from the group`,
            [
                {
                    text: "Delete",
                    onPress: () => deleteUser(user),
                    style: "destructive",
                },
                {
                    text: "Cancel"
                }
            ]
        )
    }

    const deleteUser = async (user) => {
    const chatRoomUsersToDelete = (await DataStore.query(ChatRoomUser)
       ).filter(cru => cru.chatroom.id === chatRoom.id && cru.user.id === user.id);
        if(chatRoomUsersToDelete.length > 0){
            await  DataStore.delete(chatRoomUsersToDelete[0]);
            setAllUsers(allUsers.filter((u) => u.id !== user.id))
        }
    }


    return (
        <View style={styles.root}>
            <Text style={styles.title}>{chatRoom?.name}</Text>
            <Text style={styles.title}>Users ({allUsers?.length})</Text>
            <FlatList 
              data={allUsers}
              renderItem={({item}) => (
                <UserItem 
                  user={item} 
                  isAdmin={chatRoom?.Admin?.id === item.id}
                  onLongPress={() => confirmDelete(item)}
                />
              )}
            />
        </View>
    )
}

export default GroupInfoScreen
