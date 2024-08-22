import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PushNotification = ({
  plant,
  showInstantButton = false,
  compact = false,
}) => {
  const [nextWatering, setNextWatering] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
    if (plant && plant.next_watering) {
      const parsedDate = parseDate(plant.next_watering);
      if (parsedDate) {
        setNextWatering(parsedDate);
      }
    }
  }, [plant]);

  const parseDate = (dateString) => {
    let date = new Date(dateString);
    if (isNaN(date.getTime())) {
      const parts = dateString.split("-");
      if (parts.length === 3) {
        date = new Date(parts[0], parts[1] - 1, parts[2]);
      }
    }
    if (isNaN(date.getTime())) {
      const parts = dateString.split("/");
      if (parts.length === 3) {
        date = new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }

    return isNaN(date.getTime()) ? null : date;
  };

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        throw new Error("Permission not granted for notifications");
      }
    } catch (error) {
      console.warn("Error getting notification permissions:", error);
      alert(
        "Failed to get push notification permissions. Some features may not work."
      );
    }
  };

  const scheduleNotification = async () => {
    if (!nextWatering) {
      Alert.alert("Error", "Next watering date not available or invalid");
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Time to water your ${plant.plant_name || "plant"}!`,
          body: `Don't forget to give your ${
            plant.plant_nickname || "plant"
          } some water.`,
        },
        trigger: nextWatering,
      });
      Alert.alert(
        "Success",
        `Notification scheduled for ${nextWatering.toLocaleString()}`
      );
    } catch (error) {
      console.error("Error scheduling notification:", error);
      Alert.alert(
        "Error",
        "Failed to schedule notification. Please check your permissions and try again."
      );
    }
  };

  const sendInstantNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Instant Notification",
          body: "This is a test notification sent instantly.",
        },
        trigger: null,
      });
      Alert.alert("Success", "Instant notification sent!");
    } catch (error) {
      console.error("Error sending instant notification:", error);
      Alert.alert(
        "Error",
        "Failed to send instant notification. Please check your permissions and try again."
      );
    }
  };

  return (
    <View style={[compact && { padding: 10 }]}>
      {plant && (
        <>
          <TouchableOpacity
            style={[styles.button, !nextWatering && styles.disabledButton]}
            onPress={scheduleNotification}
            disabled={!nextWatering}
          >
            <Text
              style={[
                styles.buttonText,
                !nextWatering && styles.disabledButtonText,
              ]}
            >
              Schedule Reminder
            </Text>
          </TouchableOpacity>
        </>
      )}
      {showInstantButton && (
        <TouchableOpacity
          style={[styles.button, styles.instantButton]}
          onPress={sendInstantNotification}
        >
          <Text style={[styles.buttonText, styles.instantButtonText]}>
            Send Instant Notification
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#388E3C",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#66BB6A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#C8E6C9",
  },
  disabledButtonText: {
    color: "#81C784",
  },
  instantButton: {
    backgroundColor: "#4CAF50",
    marginTop: 15,
  },
  instantButtonText: {
    color: "#FFFFFF",
  },
});

export default PushNotification;
