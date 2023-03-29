import React, { useCallback} from "react";

import { NavigationContainer } from "@react-navigation/native";

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useRoute } from "./router";

export function App()
{
  const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const routing = useRoute({});
  // const routing = useRoute(null);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer >
      {routing}
    </NavigationContainer>
  );
}

