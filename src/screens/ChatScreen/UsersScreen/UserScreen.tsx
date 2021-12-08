import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native';
import UserItem from "../../../Components/chatComponent/UserItem"
import Amplify, {DataStore, Hub, Auth, Predicates} from "aws-amplify";
import { User, Message } from '../../../models';
import styles from "./styles";
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux'

const UsersScreen = () => {

    const [users, setUsers] = useState<User[]>([]);

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
    
    
    // const { height, width } = useWindowDimensions();
    // console.log(height, width);
    
    return (
        <View style={styles.page}>
            <FlatList 
              data={users}
              renderItem={({item}) => <UserItem user={item} /> }
              keyExtractor={item => item.id} 
              showsVerticalScrollIndicator={false}     
            />
        </View>
    )
}

export default UsersScreen;
