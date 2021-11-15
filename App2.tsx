import React, { useState, useEffect } from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Pressable, Text } from 'react-native';
import UserItem from "../../components/UserItem";
import NewGroupButton from "../../components/NewGroupButton";
import { useNavigation } from '@react-navigation/core';
import { DataStore, Auth } from "aws-amplify"
import { User, ChatRoom, ChatRoomUser } from "../../../src/models"




const UsersScreen = () => {

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [touchUser, setTouchUser] = useState(null);
    const [isNewGroup, setIsNewGroup] = useState(false);

    const navigation = useNavigation();
    


    // useEffect(() => {
    //    DataStore.query(User).then(setUsers);
    // }, [])

    useEffect(() => {
       //query users 
       const fetchUsers = async () => {
           const fetchedUsers = await DataStore.query(User)
           setUsers(fetchedUsers);
       }
       fetchUsers();
    }, []);


    const addUserToChatRoom = async (user, chatroom) => {
      DataStore.save(new ChatRoomUser({ user, chatroom }));
    };
  
    const createChatRoom = async (users) => {
      // TODO if there is already a chat room between these 2 users
      // then redirect to the existing chat room
      // otherwise, create a new chatroom with these users.


      const lastTry = await Promise.all(
        users.map((user) => user)
      );

      const userData = await Auth.currentAuthenticatedUser();

      const chatRoom1 = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub)
      // .map(chatRoomUser => chatRoomUser.chatroom);

      const chatRoom2 = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.user.id === lastTry[0].id)
      // .map(chatRoomUser => chatRoomUser.chatroom);

      const chatRooms = await [...chatRoom1, ...chatRoom2].filter((chatRoomUser) => chatRoomUser.user.id === lastTry[0].id)
     .map(chatRoomUser => chatRoomUser.chatroom);

      if(chatRooms && chatRooms.length){
        navigation.navigate("ChatRoom", { id: chatRooms[0].id });
        
      } else {
       
  
      // connect authenticated user with the chat room
      const authUser = await Auth.currentAuthenticatedUser();
      const dbUser = await DataStore.query(User, authUser.attributes.sub);
      if (!dbUser) {
        Alert.alert("There was an error creating the group");
        return;
      }
      // Create a chat room
      const newChatRoomData = {
        newMessages: 0,
        Admin: dbUser,
      };
      if (users.length > 1) {
        newChatRoomData.name = "New group 2";
        newChatRoomData.imageUri =
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/group.jpeg";
      }
      const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));
  
      if (dbUser) {
        await addUserToChatRoom(dbUser, newChatRoom);
      }
  
      // connect users user with the chat room
      await Promise.all(
        users.map((user) => addUserToChatRoom(user, newChatRoom))
      );
  
      
      navigation.navigate("ChatRoom", { id: newChatRoom.id });
    }};
    


    const isUserSelected = (user) => {
      return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
    };


    const onUserPress = async (user) => {
      
      if (isNewGroup) {
        if (isUserSelected(user)) {
          // remove it from selected
          setSelectedUsers(
            selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
          );
        } else {
          setSelectedUsers([...selectedUsers, user]);
        }
      } else {
        await createChatRoom([user]);
      }
    };
  
    const saveGroup = async () => {
      await createChatRoom(selectedUsers);
    };

    
 

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onPress={() => onUserPress(item)}
            isSelected={isNewGroup ? isUserSelected(item) : undefined}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)} />
        )}
      />

      {isNewGroup && (
        <Pressable style={styles.button} onPress={saveGroup}>
          <Text style={styles.buttonText}>
            Save group ({selectedUsers.length})
          </Text>
        </Pressable>
      )}
    </SafeAreaView>  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    backgroundColor: "#3777f0",
    marginHorizontal: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});


export default UsersScreen;















const initialFormState = {
    username: number,
    password: Date.now().toString(),
    phone_number: number,
    code: OTP,
    formType: "signUp",
  };

  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  const [username, updateUsername] = useState(null);
  const [password, updatePassword] = useState(null);
  const [number, updateNumber] = useState('');
  const [OTP, updateOTP] = useState('');

    const phoneInput = useRef<PhoneInput>(null);
    const { height } = useWindowDimensions()


  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      updateUser(user);

      // console.log("got user", user);

      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (err) {
      // console.log("checkUser error", err);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
      
    }
    
  };

  // Skip this if you're not using Hub. You can call updateFormState function right
  // after the Auth.signOut() call in the Button.
  const setAuthListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          // console.log(data);

          updateFormState(() => ({
            ...formState,
            formType: "signIn",
          }));

          break;
        case "signIn":
          // console.log(data);

          break;
      }
    });
  };

  useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);

  const onChange = (e) => {
    e.persist();
    updateFormState(() => ({ ...formState, [e]: e }));
  };

  const { formType } = formState;

  const signUp = async () => {
    const { username, password } = formState;

    try {
        await Auth.signUp({ username: number, password:number, attributes: { phone_number: number } });

        updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    } catch (err) {
      Alert.alert(err.message)
    }

    
  };
  

  const confirmSignUp = async () => {
    // const { username, code } = formState;
    // console.log(number);
     const username= number;
      const code = OTP;
    

    try {
     
      

      await Auth.confirmSignUp(username, code).then(() => signIn());
      
    } catch (error) {
      // console.log('error confirming sign up', error);
    }

      

    updateFormState(() => ({ ...formState, formType: "signIn" }));
  };

  const signIn = async () => {
    const { username, password } = formState;

    await Auth.signIn({username: number , password:number});

    updateFormState(() => ({ ...formState, formType: "signedIn" }));
  };
  // console.log(formType);

  // if(!user){
  //   return(
  //     <ActivityIndicator />
  //   )
  // }

    return (
        <NavigationContainer>
            {formType === "signUp" && (
              <View >
                 
                <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
                  <View style={styles.phoneInputContainer}>
                    <PhoneInput
                      ref={phoneInput}
                      defaultValue={number}
                      defaultCode="IN"
                      layout="first"
                      onChangeFormattedText={(text) => {
                        updateNumber(text);
                      }}
                      withDarkTheme
                      withShadow
                    />
                    </View>
                    {/* {/* <TextInput
                      name="password"
                      type="password"
                      onChange={onChange}
                      placeholder="password"
                    /> */}
                    {/* <TextInput name="email" onChange={onChange} placeholder="email" /> */} 

                    <Pressable onPress={signUp} style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>SignUp</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() =>
                          updateFormState(() => ({
                            ...formState,
                            formType: "confirmSignUp",
                          }))
                        }
                        style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Verify OTP</Text>
                  </Pressable> 
                </View>
      )}

      {formType === "confirmSignUp" && (
        <View>
        <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
        <View style={styles.phoneInputContainer}>
          <TextInput
            name="code"
            value={OTP}
            onChangeText={(otp) => updateOTP(otp)}
            placeholder="cnfirm auth code"
            keyboardType={'numeric'}
          />
          </View>
          <Pressable onPress={confirmSignUp} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </Pressable>
        </View>
      )}

      {formType === "signIn" && (
        <View>
        <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
          <View style={styles.phoneInputContainer}>
                    <PhoneInput
                      ref={phoneInput}
                      defaultValue={number}
                      defaultCode="IN"
                      layout="first"
                      onChangeFormattedText={(text) => {
                        updateNumber(text);
                      }}
                      withDarkTheme
                      withShadow
                    />
                    </View>
          {/* <TextInput
            name="password"
            type="password"
            onChange={onChange}
            placeholder="password"
          /> */}
          <Pressable onPress={signIn} style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>SignIn</Text>
                    </Pressable>
                    <Pressable 
                        onPress={() =>
                          updateFormState(() => ({
                            ...formState,
                            formType: "signUp",
                          }))
                        }
                        style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Create Account</Text>
                  </Pressable> 
        </View>
      )}

      {formType === "signedIn" && (
        <TabAndStack />
      )}
        </NavigationContainer>
    )
}