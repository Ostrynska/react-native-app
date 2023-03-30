// export default function RegistrationScreen()
// {
//     // const [login, setLogin] = useState("");
//     // const [email, setEmail] = useState("");
//     // const [password, setPassword] = useState("");

//     // const loginHandler = (text) => setLogin(text);
//     // const emailHandler = (email) => setEmail(email);
//     // const passwordHandler = (text) => setPassword(text);
// }

import React, { useState, useEffect } from "react";

import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from "react-native";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { EvilIcons } from '@expo/vector-icons';

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation })
{
  const { height, width } = Dimensions.get('window');

  const [isSecureEntry, setSecureEntry] = useState(true);
  const [state, setState] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [isFocused, setIsFocused] = useState({
      login: false,
      email: false,
      password: false,
    })

    const onFocus = (inputName) => {
      setIsFocused({
        [inputName]: true
      })
    }

    const onBlur = (inputName) => {
      setIsFocused({
        [inputName]: false
      })
    }
  
  useEffect(async () =>
  {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // if (status !== 'granted')  {
      //   alert('Permisson denied!')
      // }
    }
  }, [])

  const PickProfileImage = async () =>
  {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    console.log(result);
    if (!result.canceled) {
      setProfileImage(result.uri)
    }
  }

  const keyboardHide = () =>
  {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        height={height}
        width={width}
        style={styles.container}
        keyboardVerticalOffset={-150}
    >
        <ImageBackground
          style={styles.image}
          height={height}
          width={width}
          preserveAspectRatio='xMidYWid slice'
          source={require("../../assets/images/signUp-bg.jpg")}
        >
        <View style={styles.innerBox} height={height / 1.55}>
            {profileImage ?
              <Image
                source={{ uri: profileImage }}
                style={{...styles.photoBox, width: 120, height: 120 }} />
              : <View style={{ ...styles.photoBox, backgroundColor: "#F6F6F6" }}></View>}
            <TouchableOpacity onPress={PickProfileImage} >
              {/* <View style={{...styles.photoBoxAddBtn, width: 25, height: 25, backgroundColor: '#FFFFFF', borderRadius: 100}}></View> */}
              <EvilIcons name="plus" size={25} color="#FF6C00" style={styles.photoBoxAddBtn}/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Create Account</Text>
                <View style={styles.form}>
                  <TextInput
                    style={isFocused.login ? [styles.input, styles.inputFocused] : styles.input}
                    placeholder="Login"
                    placeholderTextColor="#BDBDBD"
                    textContentType={"username"}
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                    onFocus={() => onFocus('login')}
                    onBlur={() => onBlur('login')}
                  />
                  <TextInput
                    style={isFocused.email ? [styles.input, styles.inputFocused] : styles.input}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    inputmode={'email'}
                    textContentType={"emailAddress"}
                    keyboardType={'email-address'}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    onFocus={() => onFocus('email')}
                    onBlur={() => onBlur('email')}
                  />
              <View>
                  <TextInput
                    style={isFocused.password ? [styles.input, styles.inputFocused] : {...styles.input, position: 'relative'}}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    textContentType={"password"}
                    secureTextEntry={isSecureEntry}
                    maxLength={10}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, password: value }))
                    }
                    onFocus={() => onFocus('password')}
                    onBlur={() => onBlur('password')}
                />
                <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
                  <Text style={styles.textSecure}>{isSecureEntry ? "Show" : "Hide"}</Text></TouchableOpacity>
              </View>
            <View style={styles.btnBox}>
                <TouchableOpacity style={styles.btn} onPress={keyboardHide}>
                <Text style={styles.btnText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text onPress={() => navigation.navigate("Login")} style={styles.text}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
},
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
},
  innerBox: {
    position: "relative",
    alignItems: 'center',
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  photoBox: {
    position: "absolute",
    marginTop: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  photoBoxAddBtn: {
    position: "absolute",
    marginLeft: 47,
    marginVertical: 20,
  },
  titleText: {
    marginTop: 92,
    marginBottom: 15,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 1,
},
  form: {
    width: "100%",
    paddingHorizontal: 20,
},
  input: {
    marginTop: 16,
    height: 50,
    padding: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  inputFocused: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF'
  },
  textSecure: {
    position: "absolute",
    marginTop: -35,
    marginLeft: Platform.OS == "ios" ? 335 : 305,
    color: '#1B4371',
  },
  btnBox: {
    marginTop: 45,
  },
  btn: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    padding: 16,
    },
  text: {
    marginTop: 18,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    textAlign: 'center',
  }
});


