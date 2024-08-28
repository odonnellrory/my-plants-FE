import React from "react";
import { Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <LottieView source={require("../loadingImage.json")} autoPlay loop style={styles.animation} />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
});
