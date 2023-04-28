import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth } from "../../firebase/config";

import { updateUserProfile, authSignOut, authStateChange, updateUserAvatar } from "./authReducer";


export const authSignUpUser =
  ({ email, password, nickname, userPhoto }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: userPhoto,
      });
      const user = auth.currentUser;
      console.log('user', user);

      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          userPhoto: user.photoURL,
          email: user.email,
        })
      );
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

export const authSignInUser = ({ email, password }) => async () =>
{
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      Alert.alert(error.message);
    }};

export const authSignOutUser = () => async (dispatch) => {
  signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch) => {
  auth.onAuthStateChanged(async (user) => {
    try {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          nickname: user.displayName,
          userPhoto: user.photoURL,
          email: user.email,
        };

        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  });
};

export const authUpdateAvatar = (photoURL) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL,
    });
    const user = auth.currentUser;
    dispatch(
      updateUserAvatar({
        userPhoto: user.photoURL,
      })
    );
  } catch (error) {
      Alert.alert(error.message);
    }
  };