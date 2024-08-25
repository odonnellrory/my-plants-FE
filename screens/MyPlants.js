import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View, Pressable, Modal, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import testData from "../ExampleData";
import PlantCard from "../Components/PlantCard";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { getPlantList } from "../src/api";

export default function MyPlants() {
  const [plants, setplants] = useState([]);
  const data = testData();
  let navigation = useNavigation();
  const route = useRoute();
  const newAddedPlant = route.params?.newAddedPlant.plant._id ? route.params?.newAddedPlant.plant._id : "";
  console.log(newAddedPlant);

  const { loggedInUser } = useContext(UserContext);
  const username = loggedInUser.username;

  useEffect(() => {
    getPlantList(username)
      .then(({ data }) => {

        setplants(data.plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newAddedPlant]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.singlePlantContainer}>
        <View>
          {plants.map((plant) => {
            return <PlantCard plant={plant} key={plant._id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
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
    backgroundColor: "#66BB6A",
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
};

const addPlant = {};
