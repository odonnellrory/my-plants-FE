import React, { useState } from "react";
import { Button, Text, View, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddPlantModal from "./AddPlantModal";

export default function MyPlants() {
  let navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleButtonClick() {
    setIsModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <AddPlantModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      <Pressable title="Add Plant" style={styles.button} onPress={handleButtonClick}>
        <Text style={styles.text}>Add Plant</Text>
      </Pressable>
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
