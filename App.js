import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, StyleSheet, Text, View } from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import Camerajs from "./screens/Camerajs";
import MyPlants from "./screens/MyPlants";
import Search from "./screens/Search";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="My Plants">
          <Tab.Screen
            name="My Plants"
            component={MyPlants}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="flower-outline" size={size} color={color} /> }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} /> }}
          />
          <Tab.Screen
            name="My Profile"
            component={HomeScreen}
            options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
