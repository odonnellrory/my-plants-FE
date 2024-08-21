import React from "react";
import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
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
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to My Plant App</Text>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate("LoginScreen")}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("RegisterScreen")}
          color="green"
        />

        <Button
          title="Continue as Guest"
          onPress={handleGuestLogin}
          color="grey"
        />
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
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default WelcomeScreen;
