import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'

import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

import { Feather } from '@expo/vector-icons';

import { authSignOutUser } from "../../redux/auth/authOperations";

const PostsScreen = ({ navigation }) =>
{
    const dispatch = useDispatch(); 
    
    const signOut = () =>
    {
    dispatch(authSignOutUser());
  };
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
            <View style={styles.innerBox} height={60}>
                <View style={styles.avatarBox}></View>
                <View style={styles.infoBox}>
                    <Text style={styles.user}>Natali Romanova</Text>
                    <Text style={styles.email}>email@example.com</Text>
                </View>
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
        backgroundColor: "black",
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
})

export default PostsScreen;