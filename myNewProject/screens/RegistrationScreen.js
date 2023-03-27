
// import React, { useState } from "react";
// import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Alert, Button,} from 'react-native';

// export default function RegistrationScreen()
// {
//     // const [login, setLogin] = useState("");
//     // const [email, setEmail] = useState("");
//     // const [password, setPassword] = useState("");

//     // const loginHandler = (text) => setLogin(text);
//     // const emailHandler = (email) => setEmail(email);
//     // const passwordHandler = (text) => setPassword(text);

//     // const onLogin = () => {
//     //     Alert.alert("Credentials", `${login} + ${password}`);
//     // };

//     return (
//         <View style={styles.container}>
//             <ImageBackground
//                 source={require('../assets/images/registration-bg.jpg')}
//                 style={styles.image}
//             >
//                 <Text>Registration</Text>
//             </ImageBackground>
//         {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View style={styles.container}>
//                 <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
//                 <Text>Registration</Text>
//                     <TextInput
//                         value={login}
//                         onChangeText={loginHandler}
//                         placeholder="Login"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         value={email}
//                         onChangeText={emailHandler}
//                         placeholder="Email"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         value={password}
//                         onChangeText={passwordHandler}
//                         placeholder="Password"
//                         secureTextEntry={true}
//                         style={styles.input}
//                     />
//                 </KeyboardAvoidingView>
//             </View>
//         </TouchableWithoutFeedback>
//         <Button title={"Login"} style={styles.input} onPress={onLogin} /> */}
//         </View>
//     );
// }


import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen()
{
  const { height, width } = Dimensions.get('window');

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecureEntry, setSecureEntry] = useState(true);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
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
          source={require("../assets/images/signUp-bg.jpg")}
        >
        <View style={styles.innerBox} height={height / 1.55}>
          <View style={styles.photoBox}></View>
            <Text style={styles.titleText}>Create Account</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.input}
                    placeholder="Login"
                    textContentType={"username"}
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                    onFocus={() => setIsShowKeyboard(true)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    inputmode={'email'}
                    textContentType={"emailAddress"}
                    keyboardType={'email-address'}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    onFocus={() => setIsShowKeyboard(true)}
                  />
              <View>
                  <TextInput
                    style={{ ...styles.input, position: "relative" }}
                    placeholder="Password"
                    textContentType={"password"}
                    secureTextEntry={isSecureEntry}
                    maxLength={10}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, password: value }))
                    }
                    onFocus={() => setIsShowKeyboard(true)}
                />
                <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
                  <Text style={styles.textSecure}>{isSecureEntry ? "Show" : "Hide"}</Text></TouchableOpacity>
              </View>
            <View style={styles.btnBox}>
                <TouchableOpacity style={styles.btn} onPress={keyboardHide}>
                <Text style={styles.btnText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.text}>Already have an account? Sign in</Text>
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
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  titleText: {
    marginTop: 92,
    marginBottom: 15,
    // fontFamily: "Roboto-Medium",
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
    // fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  textSecure: {
    position: "absolute",
    marginTop: -35,
    marginLeft: 335,
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
    // fontFamily: "Roboto-Regular",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    padding: 16,
    },
  text: {
    marginTop: 18,
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    textAlign: 'center',
  }
});


