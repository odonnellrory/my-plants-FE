import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PlantCard(props) {
  let navigation = useNavigation();
  const { plant } = props;

  function handlePlantCardPress() {
    navigation.navigate("SinglePlant", { plant, name: plant.plant_name });
  }

  return (
    <Pressable style={styles.container} onPress={handlePlantCardPress}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: plant.img_url }}></Image>
        <Text>{plant.plant_nickname}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{plant.plant_name}</Text>
        <View style={styles.conditionContainer}>
          <SimpleLineIcons style={styles.icons} name="drop"></SimpleLineIcons>
          <Text style={styles.conditionText}>Next Watering {plant.next_watering}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = {
  container: {
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#C0DEAD",
    marginBottom: 10,
    borderRadius: 4,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  conditionContainer: {
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  icons: {
    fontSize: 50,
    color: "#20a7db",
  },
};
