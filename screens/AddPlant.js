import React, { useState } from "react";
import { Button, Text, View, KeyboardAvoidingView, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function AddPlant() {
  const route = useRoute();
  const identifiedPlantName = route.params?.identifiedPlant ? route.params?.identifiedPlant.name : "";

  console.log(identifiedPlantName);
  let navigation = useNavigation();

  const [plantName, setPlantName] = useState("");
  const [plantLocation, setPlantLocation] = useState("");
  const [plantNickname, setPlantNickname] = useState("");

  function handlePlantLocationChange(newText) {
    setPlantLocation(newText);
  }

  function handlePlantNameChange(newText) {
    setPlantName(newText);
  }

  function handlePlantNicknameChange(newText) {
    setPlantNickname(newText);
  }

  function handleCameraPress() {
    navigation.navigate("Camera");
  }

  function handleAddPlantPress() {
    //our api call to perenual
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Plant Name</Text>
        <View style={styles.nameContainer}>
          <TextInput style={styles.nameInput} value={plantName} onChangeText={handlePlantNameChange}>
            {identifiedPlantName}
          </TextInput>
          <Pressable style={styles.namePressable}>
            <Ionicons style={styles.icon} name="camera" onPress={handleCameraPress}></Ionicons>
          </Pressable>
          <Pressable style={styles.namePressable}>
            <FontAwesome style={styles.icon} name="photo"></FontAwesome>
          </Pressable>
        </View>
        <Text style={styles.nameText}>
          This is used to identify the plant. It can be it's scientific name or its common name. If you are unsure you can take a photo and identify
          the plant that way
        </Text>
        <Text>Plant Location (optional)</Text>
        <TextInput style={styles.input} value={plantLocation} onChangeText={handlePlantLocationChange}></TextInput>
        <Text style={styles.nameText}>Where is this plant kept? e.g. Living room</Text>
        <Text>Plant Nickname (optional)</Text>
        <TextInput style={styles.input} value={plantNickname} onChangeText={handlePlantNicknameChange}></TextInput>
        <Text style={styles.nameText}>Feel free to give your plant a nickname!</Text>
        <Pressable title="Add Plant" style={styles.pressable} onPress={handleAddPlantPress}>
          <Text style={styles.text}>Add Plant</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff4c7",
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
  },

  formContainer: {
    alignSelf: "stretch",
    margin: 15,
    gap: 10,
  },
  nameInput: {
    flex: 6,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  nameText: {
    backgroundColor: "#FFE1A1",
    padding: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#fff",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
  },
  namePressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "gray",
    backgroundColor: "white",
  },
  icon: {
    fontSize: 25,
  },
  pressable: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "100vw",
    backgroundColor: "#ed8a53",
    marginTop: 30,
  },
});
