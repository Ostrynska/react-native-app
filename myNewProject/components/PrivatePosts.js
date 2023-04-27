import { EvilIcons, AntDesign, Feather } from "@expo/vector-icons";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getOwnPosts } from "../redux/posts/postsOperations";
import { useEffect, useState } from "react";

export const PrivatePosts = ({ item, navigation }) => {
  const userNickname = useSelector((state) => state.auth.nickname);
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  const [likeCounter, setLikeCounter] = useState("#BDBDBD");

  const {
    photo,
    title,
    comments,
    photoLocation,
    inputLocation,
    userPhoto,
    nickname,
    id,
    likes,
  } = item;

  useEffect(() => {
    if (likes?.includes(userNickname)) {
      setLikeCounter("#FF6C00");
    } else {
      setLikeCounter("#BDBDBD");
    }
    const unsub = onSnapshot(doc(db, "posts", id), (doc) => {
      setPost(doc.data());
    });
    return () => unsub();
  }, [likes]);

  if (!likes) {
    return;
  }

  const postRef = doc(db, "posts", id);
  const like = async () => {
    if (post.likes.includes(userNickname)) {
      const filteredLikes = post.likes.filter((like) => like !== userNickname);
      await updateDoc(postRef, {
        likes: filteredLikes,
      });
      setLikeCounter("#BDBDBD");
      dispatch(getOwnPosts());
    } else {
      await updateDoc(postRef, {
        likes: [...post.likes, userNickname],
      });
      setLikeCounter("#FF6C00");
      dispatch(getOwnPosts());
    }
  };
  return (
    <View style={{ marginBottom: 20, justifyContent: "center" }}>
      <Image
        source={{
          uri: photo,
        }}
        style={{ width: '100%', height: 240, borderRadius: 8 }}
        />
       <Text style={styles.title}>{title}</Text>
      <View style={styles.informationBox}>
        <TouchableOpacity
          style={styles.spanBox}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Comments", { photo, id })}
        >
          <EvilIcons name="comment" size={24} color="#BDBDBD" />
          <Text style={styles.spanValue}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.spanBox} activeOpacity={0.8}>
          <AntDesign
            style={styles.spanLikeIcon}
            name="like2"
            size={20}
            color={likeCounter}
            onPress={like}
          />
          <Text style={styles.spanValue}>{likes?.length}</Text>
        </TouchableOpacity>
        <View style={styles.spanBoxLocation}>
          <EvilIcons name="location" size={24} color="#BDBDBD" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Map", { photoLocation })}
          >
            <Text style={styles.location}>{inputLocation}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    marginTop: 10,
    borderRadius: 50,
    width: 35,
    height: 35,
  },
  userInformation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userName: {
    marginLeft: 10,
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    marginTop: 5,
    borderRadius: 8,
    width: 343,
    height: 240,
  },
  title: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  informationBox: {
    marginTop: 12,
    flexDirection: "row",
  },
  spanBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  spanLikeIcon: {
    marginLeft: 10,
  },
  spanBoxLocation: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  location: {
    alignItems: 'flex-end',
    fontFamily: 'Roboto-Regular',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: '#212121',
  },
  spanValue: {
    marginLeft: 5,
    fontFamily: 'Roboto-Regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    // color: '#BDBDBD',
  },
});