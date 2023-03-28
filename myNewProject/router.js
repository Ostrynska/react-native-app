import React from "react";


import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from "./screens/main/ProfileScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import PostsScreen from "./screens/main/PostsScreen";

import PostsIcon from "./assets/svg/tabBar/posts.svg";
import UserIcon from "./assets/svg/tabBar/user.svg";
import CreateIcon from "./assets/svg/tabBar/createPost.svg";
import LogOutIcon from "./assets/svg/tabBar/logOut.svg";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) =>
{
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Registration" >
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }} />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} />
      </AuthStack.Navigator>
    )
  }
  return (
      <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
          <MainTab.Screen
              name='Posts'
              component={PostsScreen}
              options={{
                  tabBarIcon: ({ focused, size, color }) =>
                  {
                      <TouchableOpacity><PostsIcon size={size} color={color}/></TouchableOpacity>
                  }
              }}
              />
        <MainTab.Screen name='Create' component={CreatePostsScreen} />
        <MainTab.Screen name='Profile' component={ProfileScreen} />
      </MainTab.Navigator>
  )
}