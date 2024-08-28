import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import LottieView from "lottie-react-native";

const PlantGravestone = ({ plant }) => {
  const info = plant.description.split(".");

  return (
    <View style={styles.container}>
      <LottieView source={require("../HoverPlantpot.json")} autoPlay loop style={styles.plantPot} />

      <View style={styles.container2}>
        <Text style={styles.text}>In Memory of: </Text>
        <Text style={styles.name}>{plant.nickname ? plant.nickname : plant.common_name }</Text>
        <Text style={styles.description}>{info[0]}.</Text>
      </View>
    </View>
  );
};

export default PlantGravestone;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    alignItems: "center",

  },
  container2: {
    backgroundColor: "#8CC498",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 20,
    alignItems: "center",
    width: 250,
    borderTopRightRadius: 150,
    borderTopLeftRadius: 150
  
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#346840",
    fontWeight: "bold",
  },
  plantPot: {
    width: 150,
    height: 150,
  },
  description: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});
