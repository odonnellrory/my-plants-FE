import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function IdentifiedPlantCard(props) {
  let navigation = useNavigation();
  const { identifiedPlant } = props;

  function handleMyPlantPress(event) {
    navigation.navigate("Add A Plant", { identifiedPlant });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: identifiedPlant.similar_images[0].url }}></Image>
      <View>
        <Text>Suggested Plant Name: {identifiedPlant.name}</Text>
        <Text>Probability: {(identifiedPlant.probability * 100).toFixed(2)}%</Text>
      </View>
      <Pressable style={styles.pressable} onPress={handleMyPlantPress}>
        <Text style={styles.text}>Yes! This looks like my plant</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  container: {
    alignSelf: "stretch",
    backgroundColor: "#C0DEAD",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
  },
  image: {
    height: 300,
    width: 300,
  },
  pressable: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ed8a53",
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#fff",
  },
};
