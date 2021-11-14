import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import UserItem from '../../../Components/chatComponent/UserItem';
import styles from "./styles";


const UsersScreen = () => {

    const Users = useSelector(state => state.users);

    

    return (
        <View style={styles.page}>
           <FlatList 
             data={Users}
             renderItem={({item}) => <UserItem user={item}/>}
             showsVerticalScrollIndicator={false}
            />
        </View>
    )
}


export default UsersScreen;
