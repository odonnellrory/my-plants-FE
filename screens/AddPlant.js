import React, { useEffect, useState } from "react";
import { Button, Text, View, KeyboardAvoidingView, TextInput, StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AddPlantModal from "./AddPlantModal";

export default function AddPlant() {
  const route = useRoute();
  const identifiedPlantName = route.params?.identifiedPlant ? route.params?.identifiedPlant.name : "";

 

  let navigation = useNavigation();

  const [plantName, setPlantName] = useState(identifiedPlantName);
  const [plantLocation, setPlantLocation] = useState("");
  const [plantNickname, setPlantNickname] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plantList, setPlantList] = useState([]);

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

    setIsLoading(true);
    setIsModalVisible(true);

    // axios.get(`${API_URL}${plantName}`).then((response) => {


    //   setPlantList(response.data.data)
   

    // }
    // )
   
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Plant Name</Text>
        <View style={styles.nameContainer}>
          <TextInput style={styles.nameInput} value={plantName} onChangeText={handlePlantNameChange}></TextInput>
          <TouchableOpacity style={styles.namePressable}>
            <Ionicons style={styles.icon} name="camera" onPress={handleCameraPress}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity style={styles.namePressable}>
            <FontAwesome style={styles.icon} name="photo" onPress={handlePhotoGalleryPress}></FontAwesome>
          </TouchableOpacity>
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
        <TouchableOpacity title="Add Plant" style={styles.pressable} onPress={handleAddPlantPress}>
          <Text style={styles.text}>Add Plant</Text>
        </TouchableOpacity>
        <AddPlantModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} plantList={plantList}>

        </AddPlantModal>
      
     
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
  image: {
    width: 300,
    height: 300,
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