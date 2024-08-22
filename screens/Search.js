import React, { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

export default function User() {
  let navigation = useNavigation();
  const [plantName, setPlantName] = useState("");

  function handlePlantNameChange(newText) {
    setPlantName(newText);
  }

  function handleCameraPress() {
    navigation.navigate("Camera");
  }

  function handleSearchPress() {
    console.log("hello");
    //api call to perenual
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Plant Name</Text>
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.nameInput}
            value={plantName}
            onChangeText={handlePlantNameChange}
          ></TextInput>
          <Pressable style={styles.namePressable}>
            <Ionicons
              style={styles.icon}
              name="camera"
              onPress={handleCameraPress}
            ></Ionicons>
          </Pressable>
          <Pressable style={styles.namePressable}>
            <FontAwesome style={styles.icon} name="photo"></FontAwesome>
          </Pressable>
        </View>
        <Pressable style={styles.pressable} onPress={handleSearchPress}>
          <Text>Search</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff4c7",
    alignItems: "center",
    justifyContent: "flex-start",
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
  },
};
