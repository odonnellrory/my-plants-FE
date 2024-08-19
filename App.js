import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TabNavigator from "./TabNavigator";
import CameraScreen from "./screens/CameraScreen";
import SinglePlant from "./screens/SinglePlant";

import SignIn from "./screens/SignIn";


const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("currentUser")
      .then((user) => {
        if (user) setCurrentUser(user);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  if (isLoading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {currentUser ? (
            <>
              <Stack.Screen name="TabNavigator">
                {(props) => (
                  <TabNavigator
                    {...props}
                    handleSignOut={handleSignOut}
                    currentUser={currentUser}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen
                name="SinglePlant"
                component={SinglePlant}
                options={({ route }) => ({ title: route.params.name })}
              />
            </>
          ) : (
            <Stack.Screen name="SignIn">
              {(props) => <SignIn {...props} setCurrentUser={setCurrentUser} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
