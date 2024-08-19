import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, StyleSheet, View } from "react-native";

import TabNavigator from "./TabNavigator";
import CameraScreen from "./screens/CameraScreen";
import SinglePlant from "./screens/SinglePlant";
import AddPlant from "./screens/AddPlant";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="SinglePlant" component={SinglePlant} options={({ route }) => ({ title: route.params.name })} />
          <Stack.Screen name="Add A Plant" component={AddPlant} />
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
