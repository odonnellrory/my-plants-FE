import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import IdentifiedPlantCard from "../Components/IdentifiedPlantCard";
import { useRoute } from "@react-navigation/native";
import Loading from "../Components/Loading";
import ErrorCard from "../Components/ErrorCard";

const API_KEY = process.env.REACT_APP_PLANT_ID_API_KEY; //within .env file
const API_URL = process.env.REACT_APP_PLANT_ID_API_URL;

export default function PlantIdentifier() {
  const route = useRoute();
  const capturedImage = route.params?.imageToProcess;
  const [identifiedPlantList, setidentifiedPlantList] = useState([]);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setidentifiedPlantList([]);
  }, []);

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

      setIsIdentifying(false);
    } catch (error) {
      setIsIdentifying(false);
      setError("Looks like something went wrong trying to indentify your plant - please try again later!");
    }
  }

  if (error) return <ErrorCard errorMessage={error} />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.plantImageContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          {identifiedPlantList.length > 0 && (
            <View style={styles.userTextContainer}>
              <Text style={styles.userText}>Not getting the result you're looking for? Try taking a close up picture of the leaves on the plant</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={identifyPlant} disabled={isIdentifying}>
          <Text style={styles.text}>Identify Plant</Text>
        </TouchableOpacity>
        {isIdentifying ? (
          <View style={styles.indentifyingContainer}>
            <Loading />
          </View>
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
    backgroundColor: "#E8F5E9",
    padding: 15,
  },
  plantImageContainer: {
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  indentifyingContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignSelf: "stretch",
  },
  preview: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginVertical: 10,
  },
  TouchableOpacity: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: "#66BB6A",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  userText: {
    fontSize: 14,
    color: "#388E3C",
    padding: 8,
    marginHorizontal: 15,
  },
  userTextContainer: {
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    marginTop: 6,
    marginBottom: 12,
  },
  identifyingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
  resultText: {
    color: "white",
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
  },
  identifyingText: {
    color: "#2E7D32",
    fontWeight: "bold",
    alignText: "center",
    marginTop: 10,
    alignSelf: "center",
  },
});
