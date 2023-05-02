import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView } from "react-native";

import { Feather } from '@expo/vector-icons';

import { authSignOutUser } from "../../redux/auth/authOperations";
import { PublicPosts } from "../../components/PublicPosts";
import { getAllPosts } from "../../redux/posts/postsOperations";

const HomeScreen = ({ navigation, route }) =>
{
    const { allItems: allPosts } = useSelector((state) => state.posts);
    const {userPhoto, email, nickname} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(getAllPosts());
    }, []);

    const signOut = () =>
    {
        dispatch(authSignOutUser());
    };

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

    const renderItem = ({ item }) => (
        <PublicPosts item={item} navigation={navigation} />
    );

    const ListHeader = () =>
    {
        return (
            <View style={styles.innerBox}>
                {userPhoto !== null ? <Image style={styles.avatarBox} source={{uri: userPhoto}}/> : <View style={styles.avatarBox}></View>}
                <View style={styles.infoBox}>
                    <Text style={styles.user}>{nickname}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={{ height: 30, borderBottomColor: "#0000004D", borderWidth: 0.5, borderColor: '#ffffff', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 17, lineHeight: 22, color: '#212121', letterSpacing: -0.408, marginLeft: "45%"}}>Posts</Text>
                <TouchableOpacity onPress={signOut} style={{marginLeft: '38%', bottom: 3}}>
                    <Feather name="log-out" size={24} color="#BDBDBD"/>
                </TouchableOpacity>
                </View>
            <View style={{marginHorizontal: 16}}>
            <FlatList
                data={allPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={ListHeader}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerBox: {
        marginVertical: 32,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    avatarBox: {
        backgroundColor: "#BDBDBD",
        borderRadius: 16,
        width: 60,
        height: 60,
    },
    infoBox: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    user: {
        fontFamily: "Roboto-Medium",
        fontSize: 13,
        lineHeight: 15,
        color: "#212121",
    },
    email: {
        fontFamily: "Roboto-Regular",
        fontSize: 11,
        lineHeight: 13,
        color: "#212121CC",
    },
    titlePost: {
        marginTop: 8,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
    },
    commentsCount: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        color: '#BDBDBD',
        right: 6,
    },
    location: {
        alignItems: 'flex-end',
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'right',
        textDecorationLine: 'underline',
        color: '#212121',
    },
})

export default HomeScreen;