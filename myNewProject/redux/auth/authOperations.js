import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth } from "../../firebase/config";
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

import { updateUserProfile, authSignOut, authStateChange } from "./authReducer";

console.log('auth', auth.currentUser);

export const authSignUpUser =
  ({ email, password, nickname, userPhoto }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: userPhoto,
      });
      const { uid, displayName, photoURL } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
          userPhoto: photoURL,
        })
      );
    } catch (error) {
      Alert.alert(error.message);
    }
  };

export const authSignInUser = ({ email, password }) => async (dispatch, getState) =>
{
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      Alert.alert(error.message);
    }};

export const authSignOutUser = () => async (dispatch, setState) => {
  signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, setState) => {
  auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          nickname: user.displayName,
          userPhoto: user.photoURL,
        };

        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  });
};