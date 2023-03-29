import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PostsScreen = () =>
{
    return (
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
        marginTop: 32,
    },
    avatarBox: {
        backgroundColor: "black",
        borderRadius: 16,
        width: 60,
        height: 60,
    },
    infoBox: {
        marginLeft: 8,
        alignItem: 'center',
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