import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { updatePlantWatering } from "../src/api";
import { UserContext } from "../Context/UserContext";

const PushNotification = ({ plant }) => {
  const { loggedInUser } = useContext(UserContext);

  const handleWatered = async () => {
    if (!plant || !loggedInUser) {
      Alert.alert("Error", "Plant or user information not available");
      return;
    }

    try {
      const currentDate = new Date();
      const updatedPlant = await updatePlantWatering(
        loggedInUser.username,
        plant._id
      );
      await scheduleNextWateringNotification(updatedPlant.plant);
      Alert.alert(
        "Success",
        `Plant watered! Last watered: ${currentDate.toLocaleDateString()}\nNext watering: ${new Date(
          updatedPlant.plant.next_watering
        ).toLocaleDateString()}`
      );
    } catch (error) {
      console.error("Error updating plant watering:", error);
      Alert.alert("Error", "Failed to update plant watering. Please try again");
    }
  };

  const scheduleNextWateringNotification = async (updatedPlant) => {
    const nextWateringDate = new Date(updatedPlant.next_watering);

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Water your ${updatedPlant.common_name || "plant"}!`,
          body: `Time to water ${
            updatedPlant.nickname || updatedPlant.common_name || "plant"
          }.`,
          data: { username: updatedPlant.username, plantId: updatedPlant._id },
        },
        trigger: nextWateringDate,
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
      Alert.alert("Error", "Failed to schedule next watering notification.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleWatered}>
        <Text style={styles.buttonText}>I just watered this plant!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "#66BB6A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PushNotification;
