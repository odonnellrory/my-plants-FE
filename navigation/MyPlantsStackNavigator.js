import { createStackNavigator } from "@react-navigation/stack";
import SinglePlant from "../screens/SinglePlant";
import MyPlants from "../screens/MyPlants";

import PlantGraveyard from "../screens/PlantGraveyard";

const Stack = createStackNavigator();
export default function MyPlantsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="My Plants" screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="My Plant Collection" component={MyPlants} />

      <Stack.Screen name="Plant graveyard" component={PlantGraveyard} />

      <Stack.Screen name="SinglePlant" component={SinglePlant} options={({ route }) => ({ title: route.params.name })} />
    </Stack.Navigator>
  );
}
