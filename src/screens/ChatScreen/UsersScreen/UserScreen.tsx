import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, Pressable, SafeAreaView} from 'react-native';
import UserItem from "../../../Components/chatComponent/UserItem"
import Amplify, {DataStore, Hub, Auth, Predicates} from "aws-amplify";
import { User, Message, ChatRoom, ChatRoomUser } from '../../../models';
import styles from "./styles";
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import NewGroupButton from "../../../Components/chatComponent/NewGroupButton";
import { useNavigation } from '@react-navigation/native';


const UsersScreen = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([])
    const [isNewGroup, setIsNewGroup] = useState(false)

    const navigation = useNavigation();

    useEffect(() => {
        DataStore.query(User).then(setUsers);
    }, [])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //        const fetchedUsers = await DataStore.query(User);
    //        setUsers(fetchedUsers)
    //     }
    //     fetchUsers();
    // }, [])

    // const chatRoomData = useSelector((state) => state.users)

    // useEffect(() => {
    //    const fetchMessage = async () => {
    //        const fetchedMessage = await DataStore.query(Message, Predicates.ALL, {
    //           page: 0,
    //           limit: 10
    //         });
    //        console.log(fetchedMessage)
    //    }
    //    fetchMessage();
    // }, [])

    const addUserToChatRoom = async (user, chatroom) => {
      await DataStore.save(
          new ChatRoomUser({ user, chatroom })
      )
    }

    const createChatRoom = async (users) => {
        //ToDo if there is already a chat room between
        //these two user then redirect to existing chatroom 
        //otherwise create new chatroom with these user

        //  const authUser = await Auth.currentAuthenticatedUser();
        //  const dbUser = await DataStore.query(User, authUser.attributes.sub)

        //  const existingChatRoom = await DataStore.query(ChatRoom)
        //  const existingChatRoomUser = (await DataStore.query(ChatRoomUser, existingChatRoom.id))
        //  .filter(existingChatRoomUser => existingChatRoomUser.user.id === user.id)
         
        //  console.log(existingChatRoomUser);
         
        //  if (existingChatRoomUser[0] !== undefined){
        //     navigation.navigate("ChatRoomScreen", {id: existingChatRoomUser[0].chatroom.id})
        //  } else {
        //      console.log("Geelo")
        //  }

        // const existingUser = await DataStore.query(ChatRoomUser, existingChatRoom.id)
        

        const authUser = await Auth.currentAuthenticatedUser();
        const dbUser = await DataStore.query(User, authUser.attributes.sub)

        // Create a ChatRoom 
        const newChatRoomData = { 
            newMessage: 0,
            admin: dbUser,
        };
        if(users.length > 1) {
            newChatRoomData.name = "New Group";
            newChatRoomData.imageUri = "https://picsum.photos/seed/picsum/200/300"
        }
        const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

        //connect auth user with the chatroom
        if(dbUser){
           await addUserToChatRoom(dbUser, newChatRoom) 
        }
        
        await Promise.all(
            users.map(user => addUserToChatRoom(user, newChatRoom))
        );
        
        navigation.navigate("ChatRoomScreen", {id: newChatRoom.id})
    }

    const isUserSelected = (user) => {
      return(
          selectedUsers.some((selectedUser) => selectedUser.id === user.id)
      )
    }

    const onUserPress = async (user) => {
        if(isNewGroup){
            if(isUserSelected(user)){
                //remove it from selected
                setSelectedUsers(
                    selectedUsers.filter((selectedUser) => selectedUser.id !== user.id))
            }else{
                setSelectedUsers([...selectedUsers, user])
            }
            }else{
                await createChatRoom([user])
            }
    }

    const saveGroup = async () => {
      await createChatRoom(selectedUsers);
    }
    

    
    return (
        <SafeAreaView style={styles.page}>
            <FlatList 
              data={users}
              renderItem={({item}) => (
                <UserItem 
                  user={item} 
                  onPress={() => onUserPress(item)} 
                  isSelected={isNewGroup ? isUserSelected(item) : undefined}
                /> 
              )}
              keyExtractor={item => item.id} 
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={ () => ( 
                <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)}  /> 
            )}     
            />
            {isNewGroup && (
                <Pressable style={styles.button} onPress={saveGroup}>
                <Text style={styles.buttonText}>
                    Save Group ({selectedUsers.length})
                </Text>
                </Pressable>
           )}
        </SafeAreaView>
    )
}

export default UsersScreen;
