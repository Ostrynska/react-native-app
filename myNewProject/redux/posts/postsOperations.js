import {
  addDoc,
  collection,
  getDocs,
  query,
  getCountFromServer,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

import { postsAction } from './postsReducer';

import { Alert } from "react-native";

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;

    // get all posts
    const posts = await getDocs(collection(db, 'posts'));
    console.log('posts::', posts);

    // add id to collection and count comments
    const newPosts = posts.docs.map(async doc => {
      // Get comments count
    //   const snapshotComments = await getCountFromServer(
    //     collection(doc.ref, 'comments'),
    //   );
    //   const countComments = snapshotComments.data().count;

      return {
        ...doc.data(),
        id: doc.id,
        // countComments,
      };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
      Alert.alert(error.message);
      console.log(error);
  }
};

export const getOwnPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const posts = await getDocs(q);

    // add id to collection and count comments
    const newPosts = posts.docs.map(async doc => {
      // Get comments count
    //   const snapshotComments = await getCountFromServer(
    //     collection(doc.ref, 'comments'),
    //   );
    //   const countComments = snapshotComments.data().count;

    
      return {
        ...doc.data(),
        id: doc.id,
        // countComments,
      };
    });

    // Resolve all promises
    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updateOwnPosts(payload));
  } catch (error) {
      Alert.alert(error.message);
      console.log(error);
  }
};

export const uploadPostToServer = post => async (dispatch, getState) => {
  console.log('post::', post);
  const { userId } = getState().auth;
  try {
    await addDoc(collection(db, 'posts'), {
      ...post,
      userId,
    });
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (e) {
      Alert.alert(error.message);
      console.log(error);
  }
};