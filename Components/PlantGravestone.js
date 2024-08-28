import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import LottieView from "lottie-react-native";

const PlantGravestone = ({ plant }) => {
  const info = plant.description.split(".");

  return (
    <View style={styles.container}>
      <LottieView source={require("../HoverPlantpot.json")} autoPlay loop style={styles.plantPot} />

      <View style={styles.container2}>
        <Text style={styles.text}>In Memory of: </Text>
        <Text style={styles.name}>{plant.common_name}</Text>
        <Text style={styles.description}>{info[0]}.</Text>
      </View>
    </View>
  );
};

export default PlantGravestone;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container2: {
    backgroundColor: "#8CC498",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 250,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#346840",
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
  },
  plantPot: {
    width: 150,
    height: 150,
  },
  text: {},
  description: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});
