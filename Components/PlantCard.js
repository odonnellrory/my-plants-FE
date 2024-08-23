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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePlantCardPress}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: plant.img_url }} />
            <Text>{plant.nickname || plant.common_name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{plant.plant_name}</Text>
            <View style={styles.conditionContainer}>
              <SimpleLineIcons style={styles.icons} name="drop" />
              <Text style={styles.conditionText}>
                Next Watering: {formatDate(plant.next_watering)}
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
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
    color: "#2E7D32",
  },
  conditionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    padding: 8,
    marginTop: 5,
  },
  icons: {
    fontSize: 20,
    color: "#04D9FF",
    marginRight: 5,
  },
  conditionText: {
    fontSize: 14,
    color: "#388E3C",
  },
  notificationContainer: {
    marginTop: 10,
  },
});
