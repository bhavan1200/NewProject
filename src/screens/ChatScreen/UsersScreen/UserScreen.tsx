import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { DataStore } from "@aws-amplify/datastore"
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import UserItem from '../../../Components/chatComponent/UserItem';
import { User } from "../../../models"
import styles from "./styles";


const UsersScreen = () => {

    const [users, setUsers] = useState<User[]>([])

    // useEffect(() => {
    //     DataStore.query(User).then(setUsers)
    // }, [])

    useEffect(() => {
        const fetchUsers = async () => {
           const fetchedUsers = await DataStore.query(User);
           setUsers(fetchedUsers);
        }
        fetchUsers();
    }, [])

    return (
        <View style={styles.page}>
           <FlatList 
             data={users}
             renderItem={({item}) => <UserItem user={item}/>}
             showsVerticalScrollIndicator={false}
            />
        </View>
    )
}


export default UsersScreen;
