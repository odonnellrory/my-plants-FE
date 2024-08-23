import React from "react";
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
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
      Alert.alert(
        "Permission Error",
        "Failed to get push notification permissions. Some features may not work."
      );
    }
  };

  const scheduleNotification = async () => {
    if (!plant || !plant.next_watering) {
      Alert.alert("Error", "Next watering date not available");
      return;
    }

    const nextWateringDate = new Date(plant.next_watering);

    if (isNaN(nextWateringDate.getTime())) {
      Alert.alert("Error", "Invalid next watering date");
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Time to water your ${plant.common_name || "plant"}!`,
          body: `Don't forget to give your ${
            plant.nickname || plant.common_name || "plant"
          } some water.`,
        },
        trigger: nextWateringDate,
      });
      Alert.alert(
        "Success",
        `Notification scheduled for ${nextWateringDate.toLocaleString()}`
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
        <TouchableOpacity
          style={[styles.button, !plant.next_watering && styles.disabledButton]}
          onPress={scheduleNotification}
          disabled={!plant.next_watering}
        >
          <Text
            style={[
              styles.buttonText,
              !plant.next_watering && styles.disabledButtonText,
            ]}
          >
            Schedule Reminder
          </Text>
        </TouchableOpacity>
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
