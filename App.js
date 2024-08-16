import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import Camerajs from "./screens/Camerajs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={Camerajs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
