import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import PushNotification from "../Components/PushNotification";
import { useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { getPlantById } from "../src/api";
import { useNavigation } from "@react-navigation/native";

import Loading from "../Components/Loading";

import DeletePlant from "../Components/DeletePlant";
import GardenOption from "../Components/GardenOption";

export default function SinglePlant(props) {
  const [plantProfile, setPlantProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const route = useRoute();
  const plant = route.params?.plant;

  let navigation = useNavigation();

  const { plant_id, name } = route.params;

  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const username = loggedInUser.username;

    setIsLoading(true);

    getPlantById(username, plant_id)
      .then(({ data }) => {
        setPlantProfile(data.plant);

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) return <ErrorCard ErrorMessage={"There was an error please try again"} />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.plantInfoContainer}>
          <Text style={styles.nickname}>{plantProfile.nickname ? plantProfile.nickname : plantProfile.common_name}</Text>
          <Image style={styles.image} source={{ uri: plantProfile.image_url }} />
          <Text style={styles.guideText}>
            <Text>This plants scientific name is </Text>
            <Text style={styles.bold}>{plantProfile.scientific_name}</Text>
          </Text>
          {plantProfile.plant_location && (
            <Text style={styles.imageSuffixText}>
              {plantProfile.nickname ? (
                <Text>{plantProfile.nickname} is located in the </Text>
              ) : (
                <Text>this {plantProfile.common_name} is located in the </Text>
              )}
              <Text style={styles.bold}>{plantProfile.plant_location}</Text>
            </Text>
          )}
        </View>

        <View style={styles.careGuideContainer}>
          <View style={styles.individualCareGuideContainer}>
            <View style={styles.individualGuide}>
              <Text style={styles.guideHeadings}>Description</Text>
            </View>
            <Text style={styles.guideText}>{plantProfile.description}</Text>
          </View>

          <View style={styles.individualCareGuideContainer}>
            <View style={styles.individualGuide}>
              <Feather style={styles.sunIcon} name="sun" />
              <Text style={styles.guideHeadings}>Sunlight Guide</Text>
            </View>
            <Text style={styles.guideText}>{plantProfile.sunlight_care_guide}</Text>
          </View>
          <View style={styles.individualCareGuideContainer}>
            <View style={styles.individualGuide}>
              <SimpleLineIcons style={styles.waterIcon} name="drop" />
              <Text style={styles.guideHeadings}>Watering Guide</Text>
            </View>
            <Text style={styles.guideText}>{plantProfile.watering_care_guide}</Text>
          </View>
          <View style={styles.individualCareGuideContainer}>
            <View style={styles.individualGuide}>
              <Feather style={styles.scissorIcon} name="scissors" />
              <Text style={styles.guideHeadings}>Pruning Guide</Text>
            </View>
            <Text style={styles.guideText}>{plantProfile.pruning_care_guide}</Text>
          </View>
        </View>

        <PushNotification plant={plant} />
        <DeletePlant plant_id={plant._id} />
        <GardenOption plant_id={plant._id} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  screenContainer: {
    alignSelf: "stretch",

    marginTop: 15,
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
    marginVertical: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guideHeadings: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  individualGuide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  descriptionHeader: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    color: "#2E7D32",
  },
  careGuideContainer: {
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  descriptionContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#C8E6C9",
    alignSelf: "stretch",
    fontSize: 14,
    color: "#1B5E20",
    marginVertical: 5,
  },
  individualCareGuideContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "stretch",
    fontSize: 14,
    color: "#1B5E20",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  description: {
    padding: 10,
    borderRadius: 10,

    alignSelf: "stretch",
    fontSize: 14,
    color: "#1B5E20",
  },

  sunContainer: {
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
    fontSize: 20,
    color: "#04D9FF",
  },
  scissorIcon: {
    fontSize: 20,
    color: "brown",
  },
  sunIcon: {
    fontSize: 20,
    color: "#FFA000",
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2E7D32",
  },
  guideText: {
    fontSize: 14,
    color: "#2E7D32",
  },
  imageSuffixText: {
    fontSize: 14,
    color: "#2E7D32",
    alignText: "justify",
    alignSelf: "flex-start",
  },
  origin: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#C8E6C9",
    alignSelf: "stretch",
    fontSize: 15,
    color: "#1B5E20",
  },
  scientific_name: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#C8E6C9",
    alignSelf: "stretch",
    fontSize: 15,
    color: "#1B5E20",
  },
  animation: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
  graveyardButton: {
    marginTop: 20,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: "#AAD4B4",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
