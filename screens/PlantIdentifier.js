import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import IdentifiedPlantCard from "../Components/IdentifiedPlantCard";
import { useNavigation, useRoute } from "@react-navigation/native";

const API_KEY = process.env.REACT_APP_PLANT_ID_API_KEY; //within .env file
const API_URL = process.env.REACT_APP_PLANT_ID_API_URL;

export default function PlantIdentifier() {
  const route = useRoute();
  const capturedImage = route.params?.imageToProcess;
  const [identifiedPlantList, setidentifiedPlantList] = useState([]);
  console.log(capturedImage, "INSIDE PLANTID");
  const [isIdentifying, setIsIdentifying] = useState(false);

  async function identifyPlant() {
    if (!capturedImage) return;
    setIsIdentifying(true);

    try {
      const base64 = await FileSystem.readAsStringAsync(capturedImage, { encoding: FileSystem.EncodingType.Base64 });

      const response = await axios.post(
        API_URL,
        { images: [`data:image/jpeg;base64,${base64}`], similar_images: true },
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Key": API_KEY,
          },
        }
      );
      const suggestions = response.data.result?.classification?.suggestions || [];

      setidentifiedPlantList(
        suggestions.length > 0
          ? suggestions.slice(0, 5).map(({ name, probability, similar_images }) => ({ name, probability, similar_images }))
          : [{ name: "Unable to identify", probability: 0 }]
      );
    } catch (error) {
      console.error("Error identifying plant:", error);
      setidentifiedPlantList([{ name: "Error identifying plant", probability: 0, similar_images: {} }]);
    } finally {
      setIsIdentifying(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: capturedImage }} style={styles.preview} />

        <TouchableOpacity style={styles.pressable} onPress={identifyPlant} disabled={isIdentifying}>
          <Text style={styles.text}>Identify Plant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pressable}>
          <Text style={styles.text}>New Picture</Text>
        </TouchableOpacity>
        {isIdentifying ? (
          <Text style={styles.identifyingText}>Identifying...</Text>
        ) : (
          identifiedPlantList.length > 0 &&
          identifiedPlantList.map((identifiedPlant, index) => <IdentifiedPlantCard key={index} identifiedPlant={identifiedPlant} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff4c7",
    paddingVertical: 20,
  },
  preview: {
    width: 380,
    height: 400,
    resizeMode: "contain",
  },
  pressable: {
    height: 45,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ed8a53",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  resultText: {
    color: "white",
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
  },
  identifyingText: {
    color: "#ed8a53",
    fontWeight: "bold",
  },
});
