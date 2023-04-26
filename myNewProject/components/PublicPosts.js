import { EvilIcons, AntDesign } from "@expo/vector-icons";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/posts/postsOperations";
import { useEffect, useState } from "react";

export const PublicPosts = ({ item, navigation }) => {
  const userNickname = useSelector((state) => state.auth.nickname);
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  const [likeCounter, setLikeCounter] = useState("black");

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
      setLikeCounter("black");
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
      setLikeCounter("black");
      dispatch(getAllPosts());
    } else {
      await updateDoc(postRef, {
        likes: [...post.likes, userNickname],
      });
      setLikeCounter("#FF6C00");
      dispatch(getAllPosts());
    }
  };
  return (
    <>
      {navigation.getState().index === 0 && (
        <View style={styles.userBox}>
          <View style={styles.userInformation}>
            <Image
              source={{
                uri: userPhoto,
              }}
              style={styles.userPhoto}
            />
            <Text style={styles.userName}>{nickname}</Text>
          </View>
        </View>
      )}
      <Image
        source={{
          uri: photo,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.informationBox}>
        <TouchableOpacity
          style={styles.spanBox}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Comments", { photo, id })}
        >
          <EvilIcons name="comment" size={24} color="black" />
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
          <EvilIcons name="location" size={24} color="black" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Map", { photoLocation })}
          >
            <Text>{inputLocation}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
  },
  userName: {
    marginLeft: 10,
    fontFamily: "Roboto-Medium",
    fontSize: 13,
  },
  image: {
    marginTop: 5,
    borderRadius: 8,
    width: 343,
    height: 240,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginTop: 8,
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
  spanValue: {
    marginLeft: 5,
  },
});