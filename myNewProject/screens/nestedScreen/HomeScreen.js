import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'

import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from "react-native";

import { Feather } from '@expo/vector-icons';

import { authSignOutUser } from "../../redux/auth/authOperations";
import { PublicPosts } from "../../components/PublicPosts";
import { getAllPosts } from "../../redux/posts/postsOperations";


const HomeScreen = ({ navigation, route }) =>
{
    const { allItems: allPosts } = useSelector((state) => state.posts);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
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

    // const updatePosts = () => {
    //     dispatch(getAllPosts());
    // };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOut} style={{marginRight: 16}}>
                    <Feather name="log-out" size={24} color="#BDBDBD"/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return(
        <View style={styles.container}>
            <View style={styles.innerBox}>
                {user.userPhoto !== null ? <Image style={styles.avatarBox} source={{uri: user.userPhoto}}/> : <View style={styles.avatarBox}></View>}
                <View style={styles.infoBox}>
                    <Text style={styles.user}>{user.nickname}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 16 }}>
                <FlatList
                    data={allPosts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    style={{
                        marginBottom: 100,
                    }}
                />
            {/* <FlatList
                data={posts}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => (
                <View
                    style={{
                    marginBottom: 34,
                    justifyContent: "center",
                    // alignItems: "center",
                    }}
                >
                    <Image
                    source={{ uri: item.photo }}
                    style={{ width: '100%', height: 240, borderRadius: 8 }}
                        />
                        <Text style={styles.titlePost}></Text>
                        <View style={{ marginTop: 11, flexDirection: 'row'}}>
                            <TouchableOpacity style={{ flexDirection: "row-reverse", alignItems: 'center' }} onPress={() => navigation.navigate("Comments")}>
                                <Text style={styles.commentsCount}>0</Text>
                                <Feather name="message-circle" size={16} color="#BDBDBD"  />
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: "row", marginLeft: 'auto', alignItems: 'center'}} onPress={() => navigation.navigate("Map")}>
                                <Feather name="map-pin" size={16} color="#BDBDBD" style={{right: 8}} />
                                <Text style={styles.location}></Text>
                            </TouchableOpacity>
                        </View>
                </View>
                )}
                /> */}
            </View>
        </View>
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