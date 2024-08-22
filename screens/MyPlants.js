import React, { useState } from "react";
import { Button, Text, View, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import testData from "../ExampleData";
import PlantCard from "../Components/PlantCard";

export default function MyPlants() {
  const data = testData();
  let navigation = useNavigation();

  function handleAddPlantPress() {
    navigation.navigate("Add A Plant");
  }

  return (
    <View style={styles.container}>
      <View style={styles.singlePlantContainer}>
        {data.map((plant) => {
          return <PlantCard plant={plant} key={plant.plant_id} />;
        })}
      </View>
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
