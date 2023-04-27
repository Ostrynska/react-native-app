import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase/config';

import { Alert } from "react-native";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const getPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        return posts;
      };
      const posts = await getPosts();
      return posts.sort(
        (firstPost, lastPost) => lastPost.createdAt - firstPost.createdAt
      );
  } catch (error) {
      Alert.alert(error.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getOwnPosts = createAsyncThunk(
  "posts/getOwnPosts",
  async (uid, thunkAPI) => {
    try {
      const getPosts = async () => {
        const posts = [];
        const q = query(collection(db, "posts"), where("userId", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        return posts.sort(
            (firstPost, lastPost) => lastPost.createdAt - firstPost.createdAt
        );
        };
        const posts = await getPosts();
        return posts;
    } catch (err) {
        Alert.alert(error.message);
        return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, thunkAPI) => {
      try {
          return post;
      } catch (error) {
        Alert.alert(error.message);
        return thunkAPI.rejectWithValue(err.message);
    }
}
);

export const getPostCommnets = createAsyncThunk(
  "posts/getPostComments",
  async (id, thunkAPI) => {
    try {
      const getOwnPosts = async () => {
        const comments = [];
        const q = query(collection(db, "comments"), where("postId", "==", id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          comments.push(doc.data());
        });
        return comments;
      };
      const comments = await getOwnPosts();
      return comments.sort(
        (firstComment, lastComment) =>
          lastComment.createdAt - firstComment.createdAt
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);