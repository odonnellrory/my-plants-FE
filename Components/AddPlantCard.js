import axios from "axios";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { postPlantByUser } from "../src/api";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";

function AddPlantCard(props) {
  const { plant, plantNickname, plantLocation, setIsModalVisible } = props;
  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let navigation = useNavigation();

  let plantImage = "";

  if (plant.default_image === null || plant.default_image.original_url === null) {
    plantImage = "https://img.freepik.com/free-vector/houseplant-brown-pot-nature-icon_24877-82849.jpg";
  } else {
    plantImage = plant.default_image.original_url;
  }

  API_KEY = process.env.REACT_APP_PERENUAL_API_KEY_2;
  API_URL = process.env.REACT_APP_PERENUAL_API_URL_ID;
  API_URL_CG = process.env.REACT_APP_PERENUAL_API_URL_CG;

  function handleAddPlantPress() {
    setIsLoading(true);
    return axios
      .get(`${API_URL}${plant.id}?key=${API_KEY}`)
      .then((response) => {
        const nickname = plantNickname ? plantNickname : "";
        const plant_location = plantLocation ? plantLocation : "";
        const common_name = response.data.common_name ? response.data.common_name : "";
        const scientific_name = response.data.scientific_name ? response.data.scientific_name : "";
        const type = response.data.type ? response.data.type : "";
        const cycle = response.data.cycle ? response.data.cycle : "";
        const description = response.data.description ? response.data.description : "";
        const sunlight = response.data.sunlight[0] ? response.data.sunlight[0] : "";
        let watering = response.data.watering ? response.data.watering : "";
        const image_url = plantImage;
        let next_watering = new Date();

        const dbObject = {
          nickname,
          plant_location,
          common_name,
          scientific_name, //array in both
          type,
          cycle,
          description,
          sunlight,
          watering,
          image_url,
          next_watering,
        };

        return Promise.all([dbObject, axios.get(`${API_URL_CG}${plant.id}&key=${API_KEY}`)]);
      })
      .then(([dbObject, response]) => {
        response.data.data.forEach((responseObject) => {
          responseObject.section.forEach((careGuide) => {
            if (careGuide.type === "watering") {
              dbObject.watering_care_guide = careGuide.description ? careGuide.description.trim() : "";
            } else if (careGuide.type === "sunlight") {
              dbObject.sunlight_care_guide = careGuide.description ? careGuide.description.trim() : "";
            } else if (careGuide.type === "pruning") {
              dbObject.pruning_care_guide = careGuide.description ? careGuide.description.trim() : "";
            }
          });
        });
        return postPlantByUser(loggedInUser.username, dbObject);
      })
      .then((newAddedPlant) => {
        setIsLoading(false);
        setIsModalVisible(false);
        navigation.navigate("My Plant Collection", { newAddedPlant });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      {plant.id < 3000 && <Image style={styles.image} source={{ uri: plantImage }}></Image>}
      {plant.id < 3000 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Common name: {plant.common_name}</Text>
        </View>
      )}
      {plant.id < 3000 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Scientific name: {plant.scientific_name[0]}</Text>
        </View>
      )}
      {plant.id < 3000 && (
        <TouchableOpacity style={styles.button} onPress={handleAddPlantPress}>
          <Text style={styles.buttonText}>Add Plant to my Plant Collection</Text>
        </TouchableOpacity>
      )}

      {plant.id > 3000 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{plant.common_name}</Text>
        </View>
      )}
      {plant.id > 3000 && (
        <View style={styles.textContainer}>
          <Text style={styles.paywallText}>This plant exists in the database but is locked behind a premium api - sorry about that</Text>
        </View>
      )}
    </View>
  );
}

export default AddPlantCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: "#388E3C",
    padding: 6,
    alignSelf: "center",
  },
  paywallText: {
    fontSize: 14,
    color: "#388E3C",
    padding: 6,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#66BB6A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    width: 300,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
