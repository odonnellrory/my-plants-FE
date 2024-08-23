import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import User from "../screens/User";
import MyPlantsStackNavigator from "./MyPlantsStackNavigator";
import AddPlant from "../screens/AddPlant";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#2E7D32",
        tabBarInactiveTintColor: "#9E9E9E",
        headerTintColor: "#FFFFFF",
      })}
    >
      <Tab.Screen
        name="My Plants"
        component={MyPlantsStackNavigator}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="seedling" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Plant"
        component={AddPlant}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={User}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  tabBarIcon: {
    marginTop: 5,
  },
  headerStyle: {
    backgroundColor: "#FFF",
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitleStyle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TabNavigator;
