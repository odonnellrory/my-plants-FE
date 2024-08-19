import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import MyPlants from "./screens/MyPlants";
import Search from "./screens/Search";
import User from "./screens/User";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ handleSignOut, currentUser }) => {
  return (
    <Tab.Navigator
      screenOptions={{ headerTitleAlign: "center" }}
      initialRouteName="My Plants"
    >
      <Tab.Screen
        name="My Plants"
        component={MyPlants}
        options={{
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
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <User
            {...props}
            handleSignOut={handleSignOut}
            currentUser={currentUser}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
