import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function AddPlant() {
  const route = useRoute();
  const identifiedPlantName = route.params?.identifiedPlant
    ? route.params?.identifiedPlant.name
    : "";

  let navigation = useNavigation();

  const [plantName, setPlantName] = useState(identifiedPlantName);
  const [plantLocation, setPlantLocation] = useState("");
  const [plantNickname, setPlantNickname] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [imageToProcess, setImageToProcess] = useState("");

  useEffect(() => {
    setPlantName(identifiedPlantName);
  }, [identifiedPlantName]);

  function handlePlantLocationChange(newText) {
    setPlantLocation(newText);
  }

  function handlePlantNameChange(newText) {
    setPlantName(newText);
  }

  function handlePlantNicknameChange(newText) {
    setPlantNickname(newText);
  }

  async function handleCameraPress() {
    //navigation.navigate("Camera");
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImageSelected(result.assets[0].uri);
        const imageToProcess = result.assets[0].uri;
        navigation.navigate("Plant Identifier", { imageToProcess });
      }
    } catch (error) {}
  }

  async function handlePhotoGalleryPress() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImageSelected(result.assets[0].uri);
      const imageToProcess = result.assets[0].uri;
      navigation.navigate("Plant Identifier", { imageToProcess });
    }
  }

  function handleAddPlantPress() {
    //our api call to perenual
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
            <FontAwesome
              style={styles.icon}
              name="photo"
              onPress={handlePhotoGalleryPress}
            ></FontAwesome>
          </Pressable>
        </View>
        <Text style={styles.nameText}>
          This is used to identify the plant. It can be it's scientific name or
          its common name. If you are unsure you can take a photo and identify
          the plant that way
        </Text>
        <Text>Plant Location (optional)</Text>
        <TextInput
          style={styles.input}
          value={plantLocation}
          onChangeText={handlePlantLocationChange}
        ></TextInput>
        <Text style={styles.nameText}>
          Where is this plant kept? e.g. Living room
        </Text>
        <Text>Plant Nickname (optional)</Text>
        <TextInput
          style={styles.input}
          value={plantNickname}
          onChangeText={handlePlantNicknameChange}
        ></TextInput>
        <Text style={styles.nameText}>
          Feel free to give your plant a nickname!
        </Text>
        <Pressable
          title="Add Plant"
          style={styles.pressable}
          onPress={handleAddPlantPress}
        >
          <Text style={styles.text}>Add Plant</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8F5E9",
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
  },
  formContainer: {
    alignSelf: "stretch",
    margin: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 20,
  },
  nameInput: {
    flex: 6,
    backgroundColor: "#F1F8E9",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#81C784",
  },
  nameText: {
    backgroundColor: "#C8E6C9",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    color: "#1B5E20",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#F1F8E9",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#81C784",
    marginBottom: 15,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  namePressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#81C784",
    backgroundColor: "#F1F8E9",
    padding: 10,
  },
  icon: {
    fontSize: 25,
    color: "#4CAF50",
  },
  pressable: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: "#66BB6A",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
