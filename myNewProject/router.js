import React from "react";

import { TouchableOpacity, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux'

import { authSignOutUser } from "./redux/auth/authOperations";

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from "./screens/main/ProfileScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import PostsScreen from "./screens/main/PostsScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) =>
{
  const dispatch = useDispatch();
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login" >
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
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
            options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "";
                if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return;
            })(route),
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons name="grid-outline" size={size} color='#212121CC' style={{ left: 40, marginTop: 10 }}
              />
            ),
            headerRight: () => (
              <TouchableOpacity style={{marginRight: 16, bottom: 4}} onPress={() => dispatch(authSignOutUser())}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              ),
            headerShown: false,
          })}
        />
          <MainTab.Screen
            name='Create post'
            component={CreatePostsScreen}
            options={({ navigation, route }) => ({
            tabBarIcon: ({ focused, size, color }) => (
              <View style={{ width: 70, height: 40, borderRadius: 20, backgroundColor: "#FF6C00", alignContent: 'center', alignItems: 'center', marginTop: 9 }}>
                <AntDesign name="plus" size={16} color="#FFFFFF" style={{ marginVertical: 12 }} />
              </View>
              ),
            tabBarStyle: {display: 'none'} ,
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
              <Feather name="user" size={size} color='#212121CC' style={{ right: 40, marginTop: 10 }} />
              ),
              headerShown: false,
              // tabBarStyle: {display: 'none'},
            }}
          />
      </MainTab.Navigator>
  )
}