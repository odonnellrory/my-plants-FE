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
      <Pressable title="Add Plant" style={styles.button} onPress={handleAddPlantPress}>
        <Text style={styles.text}>Add Plant</Text>
      </Pressable>
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
    backgroundColor: "#fff4c7",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  singlePlantContainer: {
    alignSelf: "stretch",
    flex: 1,
    margin: 8,
    borderRadius: 4,
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "100vw",
    backgroundColor: "#ed8a53",
    margin: 8,
    marginBottom: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#fff",
  },
};

const addPlant = {};
