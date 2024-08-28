import React, { useEffect, useState } from "react";
import { Button, Text, View, KeyboardAvoidingView, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AddPlantModal from "./AddPlantModal";
import Loading from "../Components/Loading";

export default function AddPlant() {
  
  const route = useRoute();
  const identifiedPlantName = route.params?.identifiedPlant ? route.params?.identifiedPlant.name : "";

  let navigation = useNavigation();

  const [plantName, setPlantName] = useState(identifiedPlantName);
  const [plantLocation, setPlantLocation] = useState("");
  const [plantNickname, setPlantNickname] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPlants, setLoadingPlants] = useState(false);

  API_URL = process.env.REACT_APP_PERENUAL_API_URL_NAME;

  useEffect(() => {
    setPlantName(identifiedPlantName);

    setIsLoading(false);
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
    if (plantName.length < 1) return;
    setIsModalLoading(true);
    setIsModalVisible(true);
    setIsLoading(true);

    axios
      .get(`${API_URL}${plantName}`)
      .then((response) => {
        setPlantList(response.data.data);
        setIsModalLoading(false);
        setPlantName("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
        setIsModalLoading(false);
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text>Plant Name</Text>
          <View style={styles.nameContainer}>
            <TextInput style={styles.nameInput} value={plantName} onChangeText={handlePlantNameChange}></TextInput>
            <TouchableOpacity style={styles.nameTouchableOpacity}>
              <Ionicons style={styles.icon} name="camera" onPress={handleCameraPress}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nameTouchableOpacity}>
              <FontAwesome style={styles.icon} name="photo" onPress={handlePhotoGalleryPress}></FontAwesome>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>
              This is used to identify the plant. It can be it's scientific name or its common name. If you are unsure you can take a photo and
              identify the plant that way
            </Text>
          </View>
          <Text>Plant Location (optional)</Text>
          <TextInput style={styles.input} value={plantLocation} onChangeText={handlePlantLocationChange}></TextInput>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Where is this plant kept? e.g. Living room</Text>
          </View>
          <Text>Plant Nickname (optional)</Text>
          <TextInput style={styles.input} value={plantNickname} onChangeText={handlePlantNicknameChange}></TextInput>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Feel free to give your plant a nickname!</Text>
          </View>
          <TouchableOpacity title="Add Plant" style={styles.TouchableOpacity} onPress={handleAddPlantPress}>
            <Text style={styles.text}>Add Plant</Text>
          </TouchableOpacity>
          <AddPlantModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            plantList={plantList}
            plantLocation={plantLocation}
            plantNickname={plantNickname}
            isModalLoading={isModalLoading}
            setIsModalLoading={setIsModalLoading}
            setPlantLocation={setPlantLocation}
            setPlantNickname={setPlantNickname}
          ></AddPlantModal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8F5E9",
    flex: 1,
    padding: 15,
  },
  formContainer: {
    alignSelf: "stretch",
    padding: 15,
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
    padding: 5,
    color: "#1B5E20",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  textContainer: {
    backgroundColor: "#C8E6C9",
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#F1F8E9",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#81C784",
    marginBottom: 5,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },
  nameTouchableOpacity: {
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
  TouchableOpacity: {
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
