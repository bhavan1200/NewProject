import React, { useEffect, useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import Amplify, {DataStore, Hub, Auth, Predicates} from "aws-amplify";
import { User, Message, ChatRoom, ChatRoomUser } from '../../../models';
import Feather from 'react-native-vector-icons/Feather';



const UserItem = ({user, onPress, isSelected}) => {

    

    
    
    return (
        <Pressable onPress={onPress} style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={{
                        uri: user.imageUri}} 
                        style={styles.image} 
                    />
                </View>

                <View style={styles.rightContainer}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{user.name}</Text>
                    </View>
                </View>
                {isSelected !== undefined && (<Feather 
                  name={ isSelected ? "check-circle" : "circle"} 
                  size={20} color="grey" 
                  style={styles.icon} 
                />)}
            </Pressable>

    )
}

export default UserItem;
