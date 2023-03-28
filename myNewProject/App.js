import React, { useState, useCallback, useEffect } from "react";
// import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useRoute } from "./router";
// SplashScreen.preventAutoHideAsync();


export function App()
{
  // const [appIsReady, setAppIsReady] = useState(false);
  const routing = useRoute({});

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //       await Font.loadAsync({
  //       "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  //       "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  //     })
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

//   return (
//     <View onLayout={ onLayoutRootView }>
//       <RegistrationScreen />
//     </View> 
// )

  return (
    <NavigationContainer >
      {routing}
    </NavigationContainer>
  );
}

