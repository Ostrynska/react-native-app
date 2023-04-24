import React, { useState } from "react";
import { useDispatch } from 'react-redux'

import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation })
{
  const { height, width } = Dimensions.get('window');

  const [isSecureEntry, setSecureEntry] = useState(true);
  const [state, setState] = useState(initialState);

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const dispatch = useDispatch(); 

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

  const handleSubmit = () => {
    dispatch(authSignInUser(state));
    setState(initialState);
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
        <View style={styles.innerBox} height={height / 1.7}>
            <Text style={styles.titleText}>Login</Text>
                <View style={styles.form}>
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
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text onPress={() => navigation.navigate("Registration")} style={styles.text}>Don't have an account? Sign up</Text>
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
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  titleText: {
    marginTop: 40,
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
    padding: 15,
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
    marginTop: Platform.OS == "ios" ? 45 : 30,
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