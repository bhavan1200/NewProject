import React from "react";
import { Pressable, View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles"

const NewGroupButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <FontAwesome name="group" size={24} color="#4f4f4f" />
        <Text style={styles.text}>New group</Text>
      </View>
    </Pressable>
  );
};

export default NewGroupButton;