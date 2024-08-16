import React from "react";
import { Text, View } from "react-native";

export default function MyPlants() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff4c7",
    alignItems: "center",
    justifyContent: "center",
  },
};
