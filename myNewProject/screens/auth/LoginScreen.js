import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation })
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
          source={require("../../assets/images/signUp-bg.jpg")}
        >
        <View style={styles.innerBox} height={height / 1.7}>
            <Text style={styles.titleText}>Login</Text>
                <View style={styles.form}>
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
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  titleText: {
    marginTop: 40,
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