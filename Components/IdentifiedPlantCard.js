import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function IdentifiedPlantCard(props) {
  let navigation = useNavigation();
  const { identifiedPlant } = props;

  function handleMyPlantPress(event) {
    navigation.navigate("Add A Plant", { identifiedPlant });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.plantName}>{identifiedPlant.name}</Text>
      <Image style={styles.image} source={{ uri: identifiedPlant.similar_images[0].url }}></Image>
      <View style={styles.probabilityContainer}>
        <Text style={styles.probability}>
          <Text> There is a</Text>
          <Text style={{ fontWeight: "bold" }}> {(identifiedPlant.probability * 100).toFixed(2)}% </Text>
          <Text>chance this is your plant!</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.pressable} onPress={handleMyPlantPress}>
        <Text style={styles.text}>Yes! This looks like my plant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  plantName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2E7D32",
  },
  probability: {
    fontSize: 14,
    color: "#388E3C",
    padding: 8,
  },
  probabilityContainer: {
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    marginTop: 8,
  },
  pressable: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: "#66BB6A",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#fff",
  },
};
