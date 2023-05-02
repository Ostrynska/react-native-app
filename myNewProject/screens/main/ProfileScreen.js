import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Dimensions, Image, FlatList, SafeAreaView } from "react-native";

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";

import { AntDesign, Feather } from '@expo/vector-icons';

import { authSignOutUser, authUpdateAvatar } from "../../redux/auth/authOperations";

import { PrivatePosts } from "../../components/PrivatePosts";
import { getOwnPosts } from "../../redux/posts/postsOperations";

const  ProfileScreen = ({ navigation }) =>
{
  const { height, width } = Dimensions.get('window');

  const { nickname, userId, userPhoto } = useSelector((state) => state.auth);
  const { items: posts, allItems: allPosts, } = useSelector((state) => state.posts);
  const [profileImage, setProfileImage] = useState(userPhoto);
  const [libraryPermission, setLibraryPermission] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnPosts(userId));
  }, [posts]);

  const renderItem = ({ item }) => (
    <PrivatePosts item={item} navigation={navigation} />
  );

  const PickProfileImage = async () =>
  {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    setProfileImage(result.assets[0].uri)
    dispatch(authUpdateAvatar(result.assets[0].uri));
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  }

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
       setLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const RemoveProfileImage = () =>
  {
    dispatch(authUpdateAvatar(''));
    setProfileImage('');
  }

  const signOut = () =>
    {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          height={height}
          width={width}
          preserveAspectRatio='xMidYWid slice'
          source={require("../../assets/images/signUp-bg.jpg")}
        >
          <View style={styles.innerBox} height={height / 1.35}>
            {userPhoto ?
              <Image
                source={{ uri: userPhoto }}
                style={{...styles.photoBox, width: 120, height: 120 }} />
              : <View style={{ ...styles.photoBox, backgroundColor: "#F6F6F6" }} />}
            {userPhoto ?
              <TouchableOpacity onPress={RemoveProfileImage} >
              <View style={{...styles.photoBoxBtn, borderColor: "#BDBDBD"}}>
                <AntDesign name="close" size={16} color="#BDBDBD"/>
              </View>
              </TouchableOpacity> :
              <TouchableOpacity onPress={PickProfileImage}>
                <View style={{...styles.photoBoxBtn, borderColor: "#FF6C00"}}>
                  <AntDesign name="plus" size={16} color="#FF6C00"/>
                </View>
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={signOut} >
              <Feather name="log-out" size={24} color="#BDBDBD" style={{position: 'absolute', top: 14, left: '45%' }} />
            </TouchableOpacity>
          <Text style={styles.titleText}>{nickname}</Text>
            {posts.length === 0 ? (
              <Text >You don't have any posts yet.</Text>
            ) : (
              <SafeAreaView style={{width: '100%'}}>
                  <FlatList
                      data={posts}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                      showsVerticalScrollIndicator={false}
                      style={{
                          marginBottom: 155,
                      }}
                      />
                  </SafeAreaView>
            )}
        </View>
      </ImageBackground>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    paddingHorizontal: 16,
  },
  titleText: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: '#212121',
    textAlign: 'center',
    },
  photoBox: {
    position: "absolute",
    marginTop: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  photoBoxBtn: {
    position: "absolute",
    alignContent: 'center', 
    left: 48,
    marginVertical: 15,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 50,
    width: 23,
    height: 23,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBox: {
    alignSelf: "center",
  },
  error: {
    marginTop: 20,
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
  },
});