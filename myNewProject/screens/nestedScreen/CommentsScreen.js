import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Text,
} from "react-native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { Comment } from "../../components/Comment";
import { getAllPosts, getPostCommnets } from "../../redux/posts/postsOperations";

const CommentsScreen = ({ route }) => {
  const { userId, userPhoto: photoURL } = useSelector((state) => state.auth);
  const comments = useSelector((state) => state.posts.comments);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const renderItem = ({ item }) => <Comment item={item} />;
  useEffect(() => {
    dispatch(getPostCommnets(route.params.id));
  }, []);

  const sendMessage = async () => {
    const date = new Date().getTime();
    const id = uuid.v4();
    if (message === "") return;

    const newMessage = {
      id: id,
      text: message,
      createdAt: date,
      uid: userId,
      postId: route.params.id,
      photoURL,
    };

    await setDoc(doc(db, "comments", `${id}`), newMessage);
    const postRef = doc(db, "posts", route.params.id);

    await updateDoc(postRef, {
      comments: comments.length + 1,
    });
    dispatch(getPostCommnets(route.params.id));
    dispatch(getAllPosts());
    setMessage("");
  };
              {/* {comments.postId === posts.} */}

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={70}
      >
        <View style={styles.topBox} />
        <SafeAreaView style={styles.bottomBox}>
          {comments.length === 0 ? (
            <Text style={styles.error}>
              There are no comments under this post yet.
            </Text>
          ) : (
            <FlatList
              data={comments}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={{
                marginTop: 10,
              }}
            />
          )}
        </SafeAreaView>
        <View style={styles.commentForm}>
          <TextInput
            placeholder="Add a comment"
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={{...styles.input, marginHorizontal: 16}}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.sendBtn}
            onPress={sendMessage}
          >
            <Ionicons name="arrow-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  bottomBox: {
    flex: 1,
    marginHorizontal: 10,
  },
  commentForm: {
    marginBottom: 20,
    marginTop: "auto",
    position: "relative",
  },
  input: {
    marginTop: 15,
    height: 50,
    padding: 16,
    paddingRight: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F8F8F8",
    borderRadius: 100,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  sendBtn: {
    position: "absolute",
    width: 38,
    height: 38,
    bottom: 6,
    right: 24,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    marginTop: 20,
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
  },
});

export default CommentsScreen;