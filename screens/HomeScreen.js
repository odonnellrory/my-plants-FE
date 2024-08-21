import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PushNotification from "../Components/PushNotification";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <PushNotification
        title="Time to water your plant!"
        body="Don't forget to give your plant some water."
        buttonTitle="Schedule Plant Watering Reminder"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4c7",
    alignItems: "center",
    justifyContent: "center",
  },
});
