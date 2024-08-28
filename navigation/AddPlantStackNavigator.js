import { createStackNavigator } from "@react-navigation/stack";
import AddPlant from "../screens/AddPlant";
import PlantIdentifier from "../screens/PlantIdentifier";

const Stack = createStackNavigator();
export default function MyPlantsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Add Plants" screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Add A Plant" component={AddPlant} />
      <Stack.Screen name="Plant Identifier" component={PlantIdentifier} />
    </Stack.Navigator>
  );
}
