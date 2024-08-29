import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";

import TabNavigator from "./TabNavigator";
import { UserContext } from "../Context/UserContext";
import RegisterScreen from "../screens/SignUp";
import LoginScreen from "../screens/SignIn";
import WelcomeScreen from "../screens/WelcomeScreen";

import React from "react";

const Stack = createStackNavigator();

export default function RootStack() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerTitleAlign: "center" }}>
        {!loggedInUser ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "Register" }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Sign In" }} />
          </>
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
