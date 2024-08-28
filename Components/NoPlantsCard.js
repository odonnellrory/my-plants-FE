import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function NoPlantsCard() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>You don't have any plants yet! They will be shown here when you add them!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2E7D32",
  },
});
