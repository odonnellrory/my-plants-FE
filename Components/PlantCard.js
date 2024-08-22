import React from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "./PushNotification";

export default function PlantCard({ plant }) {
  let navigation = useNavigation();

  function handlePlantCardPress() {
    navigation.navigate("SinglePlant", { plant, name: plant.plant_name });
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePlantCardPress}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: plant.img_url }} />
            <Text>{plant.plant_nickname}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{plant.plant_name}</Text>
            <View style={styles.conditionContainer}>
              <SimpleLineIcons style={styles.icons} name="drop" />
              <Text style={styles.conditionText}>
                Next Watering {plant.next_watering}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
      <View style={styles.notificationContainer}>
        <PushNotification plant={plant} compact={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#99d5bf",
    marginBottom: 10,
    borderRadius: 4,
    padding: 10,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  conditionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    fontSize: 20,
    color: "#20a7db",
    marginRight: 5,
  },
  conditionText: {
    fontSize: 14,
  },
  notificationContainer: {
    marginTop: 10,
  },
});
