import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { UserContext } from "../Context/UserContext";

const TestNotification = ({ plant }) => {
  const { loggedInUser } = useContext(UserContext);

  const handleInstantNotification = async () => {
    if (!plant || !loggedInUser) {
      Alert.alert("Error", "Plant or user information not available");
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Water your ${plant.common_name || "plant"}!`,
          body: `Time to water ${plant.nickname || plant.common_name || "plant"}.`,
          data: { username: loggedInUser.username, plantId: plant._id },
        },
        trigger: null,
      });
      Alert.alert("Success", "Instant notification sent!");
    } catch (error) {
      console.error("Error sending instant notification:", error);
      Alert.alert("Error", "Failed to send instant notification.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleInstantNotification}>
        <Text style={styles.buttonText}>Test Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
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

export default TestNotification;
