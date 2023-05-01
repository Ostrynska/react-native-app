import AsyncStorage from "@react-native-async-storage/async-storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";

import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKsmVMYZyIc_9VlJq3CMacHRXr83IDTIU",
  authDomain: "social-app-39f55.firebaseapp.com",
  projectId: "social-app-39f55",
  storageBucket: "social-app-39f55.appspot.com",
  messagingSenderId: "97198942098",
  appId: "1:97198942098:web:2945087b4fbefe5325c34b",
  measurementId: "G-Q8G99RTFW7"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);
export default app;
