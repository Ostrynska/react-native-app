import React from "react";

import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, AntDesign, Feather} from '@expo/vector-icons';

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from "./screens/main/ProfileScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import PostsScreen from "./screens/main/PostsScreen";

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
      <MainTab.Navigator
          screenOptions={{
              tabBarShowLabel: false,
              headerStyle: {
                  height: 88,
                  shadowColor: "#0000004D",
                  shadowOpacity: 0.5 }
          }} >
          <MainTab.Screen
        name='Posts'
        component={PostsScreen}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="grid-outline" size={size} color
              ='#212121CC' />
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 16}}>
              <Feather name="log-out" size={24} color="#BDBDBD"/>
            </TouchableOpacity>
          ),
          })}
              />
          <MainTab.Screen
              name='Create post'
              component={CreatePostsScreen}
              options={({ navigation, route }) => ({
                tabBarIcon: ({ focused, size, color }) => (
                  <AntDesign name="plus" size={13} color="#FFFFFF" 
                                  backgroundColor={"#FF6C00"} 
                              />
                ),
                headerLeft: () => (
                  <TouchableOpacity style={{ marginLeft: 16 }}>
                    <AntDesign name="arrowleft" size={24} color="#212121" />
                  </TouchableOpacity>
                ),
                })}
          />
          <MainTab.Screen
              name='Profile'
              component={ProfileScreen} 
                options={{
                    tabBarIcon: ({focused, size, color}) => (
                        <Feather name="user" size={size} color='#212121CC' />
                    ),
                }}
              />
      </MainTab.Navigator>
  )
}