import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity  } from "react-native";

import { FontAwesome, Feather, AntDesign } from '@expo/vector-icons';

const initialState = {
  title: "",
  location: "",
};

const CreatePostsScreen = ({ navigation }) =>
{
    const { height, width } = Dimensions.get('window');

    const [state, setState] = useState(initialState);
    const [isActive, setIsActive] = useState(false)
    const [isFocused, setIsFocused] = useState({
        title: false,
        location: false,
    })

    const onFocus = (inputName) =>
    {
        setIsFocused({
            [inputName]: true
        })
    }

    const onBlur = (inputName) =>
    {
        setIsFocused({
            [inputName]: false
        })
    }
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Posts")} style={{marginLeft: 16}}>
                    <AntDesign name="arrowleft" size={24} color="#212121" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const keyboardHide = () => {
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
            <View style={styles.container}>
                <View style={styles.innerBox} height={60}>
                    <View style={styles.postImg} height={240}>
                        <View style={styles.postImgAdd}>
                            <FontAwesome name="camera" size={24} color="#BDBDBD" />
                        </View>
                    </View>
                    <Text style={styles.postImgInf}>Upload photo</Text>
                    <View style={styles.postForm}>
                            <TextInput
                                style={isFocused.title ? { ...styles.input, borderBottomColor: '#FF6C00'} : {...styles.input, fontFamily: "Roboto-Medium" }}
                                placeholder="Title..."
                                placeholderTextColor="#BDBDBD"
                                inputmode={'text'}
                                value={state.title}
                                onChangeText={(value) =>
                                    setState((prevState) => ({ ...prevState, title: value }))
                                }
                                onFocus={() => onFocus('title')}
                                onBlur={() => onBlur('title') }
                            />
                            <View style={{position: 'relative'}}>
                                <TextInput
                                    style={isFocused.location ? {...styles.input, borderBottomColor: '#FF6C00', marginTop: 32, paddingLeft: 24 } : { ...styles.input, marginTop: 32, paddingLeft: 24 }}
                                    placeholder="Location..."
                                    placeholderTextColor="#BDBDBD"
                                    textContentType={"location"}
                                    value={state.location}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({ ...prevState, location: value }))
                                    }
                                    onFocus={() => onFocus('location')}
                                    onBlur={() => onBlur('location')}
                                />
                                <View style={styles.inputIcon}>
                                    <Feather name="map-pin" size={16} color="#BDBDBD" />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: isActive ? '#FF6C00' : '#F6F6F6' }]}
                                onPress={() => onActiveButton()}
                            >
                                <Text style={isActive ? { ...styles.btn, color: "#FFFFFF"} : styles.btnText}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerBox: {
        marginHorizontal: 16,
        marginVertical: 32,

    },
    postImg: {
        width: "100%",
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        borderColor: "#E8E8E8",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postImgAdd: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    postImgInf: {
        marginTop: 14,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
    },
    postForm: {
        marginTop: 52,
    },
    input: {
        paddingBottom: 15,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        fontFamily: "Roboto-Regular",
        color: "#212121",
        fontSize: 16,
        lineHeight: 19,
    },
    inputIcon: {
        position: 'absolute',
        marginTop: 32, 
    },
    btn: {
        marginTop: 38,
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
    },
    btnText: {
        fontFamily: "Roboto-Regular",
        color: "#BDBDBD",
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        padding: 16,
        },
})

export default CreatePostsScreen;