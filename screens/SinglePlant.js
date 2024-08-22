import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, Image } from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";

export default function SinglePlant(props) {
  const route = useRoute();
  const plant = route.params?.plant;
  return (
    <View style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.nickname}>{plant.plant_nickname}</Text>
        <Image style={styles.image} source={{ uri: plant.img_url }}></Image>
      </View>
      <View style={styles.conditionContainer}>
        <View style={styles.sunWaterContainer}>
          <Feather name="sun" style={styles.sunIcon}></Feather>
          <Text>This plant does best in a {plant.sunlight} environment</Text>
        </View>
        <View style={styles.sunWaterContainer}>
          <SimpleLineIcons
            style={styles.waterIcon}
            name="drop"
          ></SimpleLineIcons>
          <Text>This plant requires {plant.water} watering</Text>
        </View>
      </View>
      <Text style={styles.description}>{plant.plant_description}</Text>
    </View>
  );
}

const styles = {
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff4c7",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentContainer: {
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "#C0DEAD",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    margin: 10,
    maxHeight: 360,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 6,
  },
  description: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ed8a53",
  },
  conditionContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center ",
  },
  sunWaterContainer: {
    flexBasis: "100%",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 150,
    margin: 10,
    padding: 4,
    borderWidth: 2,
    borderColor: "#ED8A53",
    borderRadius: 6,
  },
  waterIcon: {
    fontSize: 50,
    color: "#20a7db",
  },
  sunIcon: {
    fontSize: 50,
    color: "#FFDF22",
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
  },
};
