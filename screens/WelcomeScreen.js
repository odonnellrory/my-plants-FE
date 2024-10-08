import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: "https://wallpapers.com/images/hd/plant-iphone-zp4mdfpnp1aa0p75.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to My Plants App</Text>

        <TouchableOpacity style={styles.pressable} onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.pressableText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.pressable, styles.registerButton]} onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.pressableText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    alignSelf: "stretch",
    padding: 30,
    margin: 15,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#2E7D32",
    letterSpacing: 1,
  },
  pressable: {
    backgroundColor: "#66BB6A",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  pressableText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#81C784",
  },
  guestButton: {
    backgroundColor: "#A5D6A7",
  },
});
