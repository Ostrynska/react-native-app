import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth } from "../../firebase/config";

import { updateUserProfile, authSignOut, authStateChange } from "./authReducer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const authSignUpUser = ({avatar, login, email, password}) => async (dispatch, getState) =>
{
    try {
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
            displayName: login,
            photoURL: avatar,
        });
        const { uid, displayName} = auth.currentUser;

        dispatch(
            updateUserProfile({
            userId: uid,
            login: displayName,
            avatar: photoURL,
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
          login: user.displayName,
          avatar: user.photoURL,
        };

        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  });
};