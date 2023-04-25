import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'

import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from "react-native";

import { Feather } from '@expo/vector-icons';

import { authSignOutUser } from "../../redux/auth/authOperations";
import authSelectors from "../../redux/auth/authSelectors";

const HomeScreen = ({ navigation, route }) =>
{
    const [posts, setPosts] = useState([]);
    const user = useSelector(authSelectors.getUser);

    const dispatch = useDispatch(); 

    const signOut = () =>
    {
    dispatch(authSignOutUser());
    };

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

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
            <View style={{marginHorizontal: 16}}>
            <FlatList
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
                            <View style={{ flexDirection: "row-reverse", alignItems: 'center' }}>
                                <Text style={styles.commentsCount}>0</Text>
                                <Feather name="message-circle" size={16} color="#BDBDBD"  />

                            </View>
                            <View style={{flexDirection: "row", marginLeft: 'auto', alignItems: 'center'}}>
                                <Feather name="map-pin" size={16} color="#BDBDBD" style={{right: 8}} />
                                <Text style={styles.location}></Text>
                            </View>
                        </View>
                </View>
                )}
                />
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