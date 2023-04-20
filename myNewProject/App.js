import React, { useEffect, useCallback, useState} from "react";

import { NavigationContainer } from "@react-navigation/native";

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Provider, useDispatch, useSelector } from 'react-redux';

import { useRoute } from "./router";
import { store } from "./redux/store";
import { auth } from "./firebase/config";
// import { authStateChangeUser } from "./redux/auth/authOperations";

export function App()
{
  const [user, setUser] = useState(null);
  const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  // const { stateChange } = useSelector((state) => state.auth);
  // const { userId } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  auth.onAuthStateChanged((user) => setUser(user));

  const routing = useRoute(user);;
  // const routing = useRoute({});
  // const routing = useRoute(null);

  // useEffect(() => {
  //   dispatch(authStateChangeUser());
  // }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
    <NavigationContainer >
      {routing}
    </NavigationContainer>
    </Provider>
  );
}

