import React from 'react'
import { View, Text, Image, Pressable } from 'react-native';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const UserItem = ({user}) => {

    const navigation = useNavigation();

    const onPress = () => {
        // Create a ChatRoom 
    }
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
            </Pressable>

    )
}

export default UserItem;
