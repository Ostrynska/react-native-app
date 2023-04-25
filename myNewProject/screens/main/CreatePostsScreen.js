import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ImageBackground } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { Camera, CameraType } from "expo-camera";
import * as Location from 'expo-location';

import { FontAwesome, Feather, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import { db } from "../../firebase/config";
import uuid from "react-native-uuid";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const initialState = {
    title: "",
    location: "",
};

const CreatePostsScreen = ({ navigation }) =>
{
    const { height, width } = Dimensions.get('window');

    const [camera, setCamera] = useState(null);
    const [isOpenCamera, setIsOpenCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [state, setState] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState({
        title: false,
        location: false,
    });


    const takePhoto = async () => {
        const { uri } = await camera.takePictureAsync();
        const location = await Location.getCurrentPositionAsync();
        setIsOpenCamera((prev) => !prev);
        setPhoto(uri);
    };

    // const sendPhoto = () =>
    // {
    //     uploadPhotoToServer();
    //     navigation.navigate("Posts", { photo });
    // };

    const uploadPhotoToServer = async () =>
    {
        if (photo === null) return;
        
//     const response = await fetch(photo);
//         const file = await response.blob();
//     const uniquePostId = Date.now().toString();
// const data = await db.storage().ref(`postImage/${uniquePostId}`).put(file);
// console.log('data', data);   
    // const storage = getStorage();
    // const id = uuid.v4();
    //     const storageRef = ref(storage, `images/${id}`);
    //     console.log(storageRef);
    // const response = await fetch(photo);
    // const file = await response.blob();
    // await uploadBytes(storageRef, file);
    // // const link = await getDownloadURL(ref(storage, `images/${id}`));
    // // return link;
  };


    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOnScreens = [SCREENS.REVIEW_ORDER, SCREENS.ORDER_PAYMENT];
        return hideOnScreens.indexOf(routeName) <= -1;
    };

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

    // useEffect(() => {
    //     (async () => {
        
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     setLocation(location);
    //     })();
    // }, []);

    const handleSubmit = () => {
        uploadPhotoToServer();
        setState(initialState);
        navigation.navigate("Posts", { photo });
    };

    const openCamera = () => {
        setIsOpenCamera((prev) => !prev);
};

    const handleReset = () => {
        setState(initialState);
        setPhoto(null);
    };

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePhotoFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
        });
        setPhoto((prevState) => ({ ...prevState, photo: result }))
        if (!result.canceled) {
        setPhoto(result.assets[0].uri)
        }
        setIsOpenCamera(false);
    }

    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {
        return (
        <>
            <Text style={{ textAlign: 'center', marginVertical: '50%' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="Grant permission" />
      </>
    );
  }

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
                        {isOpenCamera === false ?
                            <ImageBackground
                        style={!photo ? [styles.postImg] : {...styles.takePhotoContainer, borderRadius: 8}}
                        source={{ uri: photo }}
                        >
                            <TouchableOpacity style={photo ? {...styles.postImgAdd, backgroundColor: '#FFFFFF4D'} : [styles.postImgAdd]} onPress={openCamera}>
                                <FontAwesome name="camera" size={24} color={photo ?  "#FFFFFF" :"#BDBDBD"} />
                            </TouchableOpacity>
                        </ImageBackground> : null}

                        {isOpenCamera === true && <Camera style={styles.camera} ref={setCamera} type={type}>
                                <TouchableOpacity onPress={toggleCameraType} style={styles.cameraType} >
                                <Ionicons name="ios-camera-reverse-outline" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                                <TouchableOpacity onPress={takePhotoFromLibrary} style={styles.libraryPhoto} >
                                <MaterialIcons name="photo-library" size={24} color="#FFFFFF" />
                                </TouchableOpacity>
                                    <TouchableOpacity onPress={takePhoto} style={styles.snapContainer} >
                                        <FontAwesome name="camera" size={24} color="#FFFFFF" />
                                    </TouchableOpacity>
                            </Camera>}
                {photo ? <Text style={styles.postImgInf}>Edit photo</Text> : <Text style={styles.postImgInf}>Upload photo</Text>}

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
                                style={styles.btn}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.btnText}>Post</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnReset}
                                onPress={() => handleReset()}
                            >
                                <Feather name="trash-2" size={24} color="#BDBDBD" style={{marginVertical: 6}} />
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
        backgroundColor: '#FFFFFF',
    },
    postImg: {
        width: "100%",
        height: 240,
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
    camera: {
        width: "100%",
        height: 240,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    takePhotoContainer: {
        width: "100%",
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    snapContainer: {
        backgroundColor: '#FFFFFF4D',
        width: 55,
        height: 55,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    cameraType: {
        left: '45%',
        bottom: '50%',
    },
    libraryPhoto: {
        right: '42%',
        top: '17%',
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

    btnReset: {
        width: 70,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        top: 210,
        backgroundColor: '#F6F6F6',
    },
})

export default CreatePostsScreen;