import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import testData from "../ExampleData";
import PlantCard from "../Components/PlantCard";
import { UserContext } from "../Context/UserContext";
import { getPlantList } from "../src/api";
import Loading from "../Components/Loading";

import PlantGraveyard from "./PlantGraveyard";

import NoPlantsCard from "../Components/NoPlantsCard";

export default function MyPlants() {
  const [plants, setplants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = testData();
  let navigation = useNavigation();
  const route = useRoute();
  const newAddedPlant = route.params?.newAddedPlant
    ? route.params?.newAddedPlant.plant._id
    : "";
  const deletedPlant = route.params?.plant_id ? route.params?.plant_id : "";

  const { loggedInUser } = useContext(UserContext);
  const username = loggedInUser ? loggedInUser.username : null;

  useEffect(() => {
    setIsLoading(true);

    getPlantList(username)
      .then(({ data }) => {
        setplants(data.plants);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newAddedPlant, deletedPlant]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.singlePlantContainer}>
        <Pressable
          style={styles.graveyardButton}
          onPress={() => navigation.navigate("Plant graveyard", { plants })}
        >
          <Text style={styles.buttonText}>The Garden</Text>
        </Pressable>

        <View>
          {plants ? (
            plants.map((plant) => {
              return <PlantCard plant={plant} key={plant._id} />;
            })
          ) : (
            <Text>No plants yet!</Text>
          )}
        </View>
        <View>
          {plants.length === 0 ? (
            <NoPlantsCard />
          ) : (
            plants.map((plant) => {
              return <PlantCard plant={plant} key={plant._id} />;
            })
          )}
        </View>
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
    padding: 15,
  },
  singlePlantContainer: {
    alignSelf: "stretch",
    flex: 1,
    marginTop: 15,
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: "#E8F5E9",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#FFFFFF",
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
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: "#66BB6A",
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
