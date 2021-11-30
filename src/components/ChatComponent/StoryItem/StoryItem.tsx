import React from 'react'
import { View, Text, Image } from 'react-native';
import styles from "./styles";

const StoryItem
 = ({chatRooms}) => {
    

    const user = chatRooms.users[1]
    return (
                <View style={styles.imageContainer}>
                    <Image source={{
                        uri: user.imageUri}} 
                        style={styles.image} 
                    />
                    <Text style={styles.name}>{user.name}</Text>
                </View>
    )
}

export default StoryItem
;
