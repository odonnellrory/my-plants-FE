import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import PushNotification from "../Components/PushNotification";

export default function SinglePlant(props) {
  const route = useRoute();
  const plant = route.params?.plant;

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.plantInfoContainer}>
        <Text style={styles.nickname}>{plant.plant_nickname}</Text>
        <Image style={styles.image} source={{ uri: plant.img_url }} />
      </View>
      <View style={styles.conditionContainer}>
        <View style={styles.sunWaterContainer}>
          <Feather name="sun" style={styles.sunIcon} />
          <Text>This plant does best in a {plant.sunlight} environment</Text>
        </View>
        <View style={styles.sunWaterContainer}>

          <SimpleLineIcons style={styles.waterIcon} name="drop" />

          <Text>This plant requires {plant.water} watering</Text>
        </View>
      </View>
      <Text style={styles.description}>{plant.plant_description}</Text>
      <PushNotification plant={plant} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#e0f3e1",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  plantInfoContainer: {
    alignSelf: "stretch",
    backgroundColor: "#C0DEAD",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    margin: 10,
    padding: 10,
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
    alignSelf: "stretch",
  },
  conditionContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    marginVertical: 10,
  },
  sunWaterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 150,
    margin: 5,
    padding: 10,
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
    marginBottom: 10,
  },
});
