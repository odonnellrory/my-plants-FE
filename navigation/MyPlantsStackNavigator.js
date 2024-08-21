import { createStackNavigator } from "@react-navigation/stack";
import SinglePlant from "../screens/SinglePlant";
import AddPlant from "../screens/AddPlant";
import MyPlants from "../screens/MyPlants";
import PlantIdentifier from "../screens/PlantIdentifier";

const Stack = createStackNavigator();
export default function MyPlantsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="My Plants" screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="My Plant Collection" component={MyPlants} />
      <Stack.Screen name="SinglePlant" component={SinglePlant} options={({ route }) => ({ title: route.params.name })} />
      <Stack.Screen name="Add A Plant" component={AddPlant} />
      <Stack.Screen name="Plant Identifier" component={PlantIdentifier} />
    </Stack.Navigator>
  );
}
