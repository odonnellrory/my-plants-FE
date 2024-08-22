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
    backgroundColor: "#E8F5E9",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  plantInfoContainer: {
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 15,
    margin: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  description: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#C8E6C9",
    alignSelf: "stretch",
    color: "#1B5E20",
  },
  conditionContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    marginVertical: 15,
  },
  sunWaterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 150,
    margin: 5,
    padding: 15,
    borderWidth: 2,
    borderColor: "#81C784",
    borderRadius: 12,
    backgroundColor: "#F1F8E9",
  },
  waterIcon: {
    fontSize: 40,
    color: "#4CAF50",
    marginBottom: 10,
  },
  sunIcon: {
    fontSize: 40,
    color: "#FFA000",
    marginBottom: 10,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2E7D32",
  },
});
