import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PlantGravestone from "../Components/PlantGravestone";
import { UserContext } from "../Context/UserContext";
import { getDeadPlants } from "../src/api";
import Loading from "../Components/Loading";
import NoMemorialPlants from "../Components/NoMemorialPlants";

const PlantGraveyard = () => {
  const { loggedInUser } = useContext(UserContext);
  const [plants, setplants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDeadPlants(loggedInUser.username)
      .then((response) => {
        setplants(response.plants);

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Something went wrong trying to load you plants - please try again later!");
      });
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <ErrorCard errorMessage={error} />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.plants}>
        {plants.length === 0 ? (
          <NoMemorialPlants />
        ) : (
          plants.map((plant) => {
            return <PlantGravestone plant={plant} key={plant._id} />;
          })
        )}
      </ScrollView>
    </View>
  );
};

export default PlantGraveyard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    justifyContent: "center",
    alignContent: "center",
  },
  plants: {
    alignSelf: "stretch",
  },
});
