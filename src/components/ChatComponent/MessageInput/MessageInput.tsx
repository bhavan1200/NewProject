import React,{useState, useEffect} from  'react'
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Image, Platform, Keyboard } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';
import { ChatRoom, User, ChatRoomUser, Message } from "../../../models"
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import ImagePicker from 'react-native-image-crop-picker';
import {v4 as uuidv4} from 'uuid';
import MessageComponent from "../Message"



const MessageInput = ({ chatRoom, messageReplyTo, removeMessageReplyTo}) => {


    const [message, setMessage] = useState('');
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const [image, setImage] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

  //   const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  //   useEffect(() => {
  //     const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
  //       setKeyboardStatus("Keyboard Shown");
  //     });
  //     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
  //       setKeyboardStatus("Keyboard Hidden");
  //     });

  //     return () => {
  //       showSubscription.remove();
  //       hideSubscription.remove();
  //     };
  //   }, []);


    const sendMessage = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const newMessage =await DataStore.save(new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        image:null,
        audio: null,
        video: null,
        status: "SENT",
        replyToMessageId: messageReplyTo?.id,
      }))
      updateLastMessage(newMessage)

      resetFields()
    };

    const updateLastMessage = async (newMessage) => {
       await DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
           updatedChatRoom.LastMessage = newMessage;
       }))
    }

    const onPlusClicked = () => {
       console.warn("OnPlusClicked")
    }

    const onPress = () => {
      if(image){
        sendImage();
      }
       else if(message){
            sendMessage();
        } else{
            onPlusClicked()
        }
        
    }

    const choosePhotoFromLiabrary = async () => {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.6,
        mediaType: 'photo',
      }).then(image => {
        // console.log(image);
        setImage(image.path);
      });
    };

    const selectPhotoFromCamera = async () => {
      await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.6,
        mediaType: 'photo',
      }).then(image => {
        // console.log(image);
        setImage(image.path);
      });
    };

    const resetFields = () => {
      setMessage("");
      setIsEmojiPickerOpen(false);
      setImage(null);
      setProgress(0);
      // setSoundURI(null);
      removeMessageReplyTo();
    };

  
    const progressCallback = progress => {
      setProgress(progress.loaded / progress.total);
    };

  const sendImage = async () => {
    if (!image) {
      console.warn("cant perform task")
      return;
    }
    const blob = await getBlob(image);
    const { key } = await Storage.put(`${uuidv4()}.png`, blob, {
      progressCallback,
    });

    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        image: key,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        audio: "None",
        status: "SENT",
        replyToMessageID: messageReplyTo?.id,
        video: "None"
      }),
    );

    updateLastMessage(newMessage);

    resetFields();
  };

  const getBlob = async () => {
    //  if(!image) {
    //    return null;
    //  }
      const response = await fetch(image);
      const blob = await response.blob();
      return blob;
  };



      return (
        <KeyboardAvoidingView
          style={[styles.root, { height : isEmojiPickerOpen ? "60%" : "auto"}]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >

        {messageReplyTo && (
          <View style={{
              backgroundColor: "f2f2f2", 
              justifyContent: "space-between", 
              alignSelf: "stretch", 
              padding: 5, 
              flexDirection: "row"
          }}>
            <View style={{flex: 1}}>
            <Text>Reply To :</Text>
              <MessageComponent message={messageReplyTo}/>
            </View>
            <Pressable onPress={() => removeMessageReplyTo()}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{margin: 5}}
            />
          </Pressable>
          </View>
        )}

        {image && (
        <View style={styles.sendImageContainer}>
          <Image
            source={{uri: image}}
            style={{width: 100, height: 100, borderRadius: 10}}
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignSelf: 'flex-end',
            }}>
            <View
              style={{
                height: 5,
                borderRadius: 5,
                backgroundColor: '#3777f0',
                width: `${progress * 100}%`,
              }}
            />
          </View>

          <Pressable onPress={() => setImage(null)}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{margin: 5}}
            />
          </Pressable>
        </View>
      )}


          <View style={styles.row}>
            <View style={styles.inputContainer}>
            <Pressable onPress={() => setIsEmojiPickerOpen((currentValue) => !currentValue)}>
              <SimpleLineIcons name="emotsmile" size={24} color="grey" style={styles.icon} />
            </Pressable>
                

                <TextInput
                  placeholder="Messages..." 
                  style={styles.input}
                  value={message}
                  onChangeText={setMessage}
                //   onSelectionChange={Keyboard.dismiss}
                />
                <Pressable onPress={choosePhotoFromLiabrary}>
                  <Feather name="image" size={24} color="grey" style={styles.icon} />
                </Pressable>

                <Pressable onPress={selectPhotoFromCamera}>
                  <Feather name="camera" size={24} color="grey" style={styles.icon} />
                </Pressable>
                
             <MaterialCommunityIcons 
               name="microphone-outline" 
               size={24} color="grey" 
               style={styles.icon}
              />
            </View>

            <Pressable onPress={onPress} style={styles.buttonContainer}>
            {message|| image ? 
               <Ionicons name="send" size={18} color="#fff" style={styles.icon} />
             : <AntDesign name="plus" size={24} color="#fff" style={styles.icon} />}
            </Pressable>
          </View>
            {isEmojiPickerOpen && (
                Keyboard.addListener("keyboardDidHide"),
              <EmojiSelector
                onEmojiSelected={emoji => setMessage(currentMessage => currentMessage + emoji)} 
                columns={9}
                category={Categories.emotion}
                showSearchBar= {false}
                showSectionTitles	={false}
              />
            )}
        </KeyboardAvoidingView>
    )
}

export default MessageInput
