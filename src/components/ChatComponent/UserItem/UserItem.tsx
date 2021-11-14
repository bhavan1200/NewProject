import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import styles from './styles';

const UserItem = ({ user }) => {

    const navigation = useNavigation();

    const onPress = () => {
        //create a chatroom
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View>
                <Image source={{uri: user.imageUri || null}} style={styles.image}/>
            </View>

            <View style={styles.rightContainer}>
               <View style={styles.row}>
                   <Text style={styles.name}>{user.name}</Text>
               </View>
            </View>
        </Pressable>
    )
}

export default UserItem;
