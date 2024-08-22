import React from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { setGuestUser } = useContext(UserContext);

  const handleGuestLogin = () => {
    setGuestUser();
    navigation.navigate("Main");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://wallpapers.com/images/hd/plant-iphone-zp4mdfpnp1aa0p75.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to My Plant App</Text>

        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.pressableText}>Sign In</Text>
        </Pressable>

        <Pressable
          style={[styles.pressable, styles.registerButton]}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.pressableText}>Sign Up</Text>
        </Pressable>

        <Pressable
          style={[styles.pressable, styles.guestButton]}
          onPress={handleGuestLogin}
        >
          <Text style={styles.pressableText}>Continue as Guest</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "80%",
    padding: 30,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#2E8B57",
    letterSpacing: 1,
  },
  pressable: {
    backgroundColor: "#2E8B57",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  pressableText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#3CB371",
  },
  guestButton: {
    backgroundColor: "#808080",
  },
});

export default WelcomeScreen;
