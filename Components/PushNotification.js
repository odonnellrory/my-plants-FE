import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { updatePlantWatering, updateUserRewards } from "../src/api";
import { UserContext } from "../Context/UserContext";

const PushNotification = ({ plant, updatePlantData }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isWatered, setIsWatered] = useState(false);
  const [nextWateringDate, setNextWateringDate] = useState(null);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    checkWateringStatus();
  }, [plant]);

  const checkWateringStatus = () => {
    const currentDate = new Date();
    const nextWatering = new Date(plant.next_watering);
    setIsWatered(currentDate < nextWatering);
    setNextWateringDate(nextWatering);
  };

  const handleWatered = async () => {
    if (!plant || !loggedInUser) {
      Alert.alert("Error", "Plant or user information not available");
      return;
    }

    const currentDate = new Date();
    const nextWateringDate = new Date(currentDate);
    nextWateringDate.setDate(nextWateringDate.getDate() + 7);

    updatePlantData({
      last_watered: currentDate.toISOString(),
      next_watering: nextWateringDate.toISOString(),
    });
    setIsWatered(true);
    setNextWateringDate(nextWateringDate);

    try {
      const [updatedPlant, updatedUser] = await Promise.all([
        updatePlantWatering(loggedInUser.username, plant._id),
        updateUserRewards(loggedInUser.username, 20),
      ]);

      await scheduleNextWateringNotification(updatedPlant.plant);

      updatePlantData(updatedPlant.plant);

      setLoggedInUser((prevUser) => ({
        ...prevUser,
        reward_points: updatedUser.user.reward_points,
      }));

      Alert.alert(
        "Success",
        `Plant watered! Last watered: ${currentDate.toLocaleDateString()}\nNext watering: ${new Date(
          updatedPlant.plant.next_watering
        ).toLocaleDateString()}\n\nYou earned 20 reward points!`
      );
    } catch (error) {
      console.error("Error updating plant watering or user rewards:", error);
      Alert.alert("Error", "Failed to update plant watering or user rewards. Please try again");

      updatePlantData({
        last_watered: plant.last_watered,
        next_watering: plant.next_watering,
      });
      checkWateringStatus();
    }
  };

  const scheduleNextWateringNotification = async (updatedPlant) => {
    const nextWateringDate = new Date(updatedPlant.next_watering);

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Water your ${updatedPlant.common_name || "plant"}!`,
          body: `Time to water ${updatedPlant.nickname || updatedPlant.common_name || "plant"}.`,
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
      <TouchableOpacity style={[styles.button, isWatered && styles.wateredButton]} onPress={handleWatered} disabled={isWatered}>
        <Text style={styles.buttonText}>{isWatered ? `Watered!` : "Water this plant!"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#66BB6A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  wateredButton: {
    backgroundColor: "#BECFC2",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PushNotification;
