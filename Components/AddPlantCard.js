import axios from "axios";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { postPlantByUser } from "../api";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function AddPlantCard(props) {
  const { plant, plantNickname, plantLocation } = props;
  const { loggedInUser } = useContext(UserContext);

  console.log(plantNickname);

  API_KEY = process.env.REACT_APP_PERENUAL_API_KEY;
  API_URL = process.env.REACT_APP_PERENUAL_API_URL_ID;
  API_URL_CG = process.env.REACT_APP_PERENUAL_API_URL_CG;

  function handleAddPlantPress() {
    return axios
      .get(`${API_URL}${plant.id}?key=${API_KEY}`)
      .then((response) => {
        const nickname = plantNickname ? plantNickname : "";
        const plant_location = plantLocation ? plantLocation : "";
        const common_name = response.data.common_name ? response.data.common_name : "";
        const plant_origin = response.data.origin[0] ? response.data.origin[0] : "";
        const scientific_name = response.data.scientific_name ? response.data.scientific_name : "";
        const type = response.data.type ? response.data.type : "";
        const cycle = response.data.cycle ? response.data.cycle : "";
        const description = response.data.description ? response.data.description : "";
        const sunlight = response.data.sunlight[0] ? response.data.sunlight[0] : "";
        const watering = response.data.watering ? response.data.watering : "";
        const img_url = plant.default_image.regular_url;

        const dbObject = {
          nickname,
          plant_location,
          common_name,
          plant_origin, //this is string in db but array in 3rd party api
          scientific_name, //array in both
          type,
          cycle,
          description,
          sunlight,
          watering,
          img_url,
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
        console.log(dbObject);

        return postPlantByUser(loggedInUser);
      })
      .then((response) => {
        //then navigate to my plants page (or single plant?) on successful post to see new plant
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      {plant.id < 3000 && <Image style={styles.image} source={{ uri: plant.default_image.regular_url }}></Image>}
      {plant.id < 3000 && <Text style={styles.text}>{plant.common_name}</Text>}
      {plant.id < 3000 && (
        <TouchableOpacity style={styles.button} onPress={handleAddPlantPress}>
          <Text style={styles.buttonText}>Add Plant to my Plant Collection</Text>
        </TouchableOpacity>
      )}
      {plant.id > 3000 && <Text style={styles.text}>{plant.common_name}</Text>}
      {plant.id > 3000 && (
        <Text style={styles.paywallText}>This plant exists in the database but is locked behind a premium api - sorry about that</Text>
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: "#388E3C",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 6,
    alignSelf: "center",
  },
  paywallText: {
    fontSize: 14,
    color: "#388E3C",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 6,
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#66BB6A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
