import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLL2wM9p5_YOMevbMWkk_BnUcntCgW_ns",
  authDomain: "rn-social-83278.firebaseapp.com",
  projectId: "rn-social-83278",
  storageBucket: "rn-social-83278.appspot.com",
  messagingSenderId: "567999647419",
  appId: "1:567999647419:web:6b7c20e92581d33af7239e",
  measurementId: "G-HM0ZDYTNCD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
