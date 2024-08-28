import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorCard = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFCDD2",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E57373",
  },
  errorText: {
    color: "#B71C1C",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ErrorCard;
