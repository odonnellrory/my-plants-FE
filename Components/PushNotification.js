import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const PushNotification = ({ plant, showInstantButton = false }) => {
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
    // First, try parsing as ISO date string
    let date = new Date(dateString);

    // If invalid, try parsing as "YYYY-MM-DD" format
    if (isNaN(date.getTime())) {
      const parts = dateString.split("-");
      if (parts.length === 3) {
        date = new Date(parts[0], parts[1] - 1, parts[2]);
      }
    }

    // If still invalid, try parsing as "DD/MM/YYYY" format
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
      alert("Next watering date not available or invalid");
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
      alert(`Notification scheduled for ${nextWatering.toLocaleString()}`);
    } catch (error) {
      console.error("Error scheduling notification:", error);
      alert(
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
        trigger: null, // null trigger means the notification is sent immediately
      });
    } catch (error) {
      console.error("Error sending instant notification:", error);
      alert(
        "Failed to send instant notification. Please check your permissions and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      {plant && (
        <>
          <Button
            title="Schedule Watering Reminder"
            onPress={scheduleNotification}
            disabled={!nextWatering}
          />
        </>
      )}
      {showInstantButton && (
        <Button
          title="TEST: Send Instant Notification"
          onPress={sendInstantNotification}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  dateText: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default PushNotification;
