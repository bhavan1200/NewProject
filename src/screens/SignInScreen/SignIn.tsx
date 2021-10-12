import React, { useEffect, useState, useRef } from "react";
import {View, Text, TextInput, Button } from "react-native"
import PhoneInput from "react-native-phone-number-input";
import Amplify, { DataStore, Hub, Auth } from "aws-amplify";


const SignIn = () => {
   

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

    await Auth.signUp({ username: number, password:number, attributes: { phone_number: number } });

    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
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



    return (
        <View>
            {formType === "signUp" && (
        <View>
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
            autoFocus
          />
          {/* {/* <TextInput
            name="password"
            type="password"
            onChange={onChange}
            placeholder="password"
          /> */}
          {/* <TextInput name="email" onChange={onChange} placeholder="email" /> */} 

          <Button title="signUp" onPress={signUp}/>

          <Text>Already signed up?</Text>

          <Button
          title="Sign In instead"
            onPress={() =>
              updateFormState(() => ({
                ...formState,
                formType: "signIn",
              }))
            }
          />
            
          
        </View>
      )}

      {formType === "confirmSignUp" && (
        <View>
          <TextInput
            name="code"
            value={OTP}
            onChangeText={(otp) => updateOTP(otp)}
            placeholder="cnfirm auth code"
            keyboardType={'numeric'}
          />
          <Text>{OTP}</Text>
          <Button title="Confirm Sign up" onPress={confirmSignUp}/>
        </View>
      )}

      {formType === "signIn" && (
        <View>
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
            autoFocus
          />
          {/* <TextInput
            name="password"
            type="password"
            onChange={onChange}
            placeholder="password"
          /> */}
          <Button title="Sign In" onPress={signIn}/>

          <Text>No account yet?</Text>

          <Button
          title="Sign Up now"
            onPress={() =>
              updateFormState(() => ({
                ...formState,
                formType: "signUp",
              }))
            }
          />
            
          
        </View>
      )}

      {formType === "signedIn" && (
        <View>
          <Text>
            Welcome the app, {user.username} ({user.attributes.email})!
          </Text>

          <Button
            title="Sign out"
            onPress={() => {
              Auth.signOut();
            }}
          />
            
          
        </View>
      )}
        </View>
    )
}

export default SignIn
