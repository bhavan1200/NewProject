import React, { useEffect, useState, useRef } from "react";
import {View, Text, TextInput, Alert, Button, ActivityIndicator, useWindowDimensions, Aler, ActivityIndicatort, Pressable, Image } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context";

import Amplify, { DataStore, Hub, Auth } from "aws-amplify";
import { AsyncStorage } from "react-native"

import TabAndStack from "./src/navigation/StackAndTab";
import OnBoardingScreen from "./src/screens/OnBoardinScreen"
import awsconfig from "./src/aws-exports"
import SignIn from "./src/screens/SignInScreen"
import Logo from "./src/assets/5.png";
import PhoneInput from "react-native-phone-number-input";
import styles from "./styles";


import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator();


Amplify.configure(awsconfig);


const App = () => {

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

export default App;

