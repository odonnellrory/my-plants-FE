import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";

const users = [
  "tickle122",
  "grumpy19",
  "happyamy2016",
  "cooljmessy",
  "weegembump",
  "jessjelly",
];

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedInUser, setGuestUser } = useContext(UserContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/login", {
        username,
        password,
      });
      setLoggedInUser(response.data.user);
      navigation.navigate("Main");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert("Error", "Bad request. Please check your input.");
            break;
          case 404:
            Alert.alert("Error", "Username not found.");
            break;
          case 401:
            Alert.alert("Error", "Incorrect password. Please try again.");
            break;
          case 500:
            Alert.alert("Error", "Server error. Please try again later.");
            break;
          default:
            Alert.alert("Error", "An unexpected error occurred.");
            break;
        }
      }
    }
  };

  const handleGuestAccess = () => {
    setGuestUser();
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.guestButton} onPress={handleGuestAccess}>
        <Text style={styles.guestButtonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: "#2E7D32",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#81C784",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  error: {
    color: "#D32F2F",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#66BB6A",
    padding: 15,
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  guestButton: {
    backgroundColor: "#81C784",
    padding: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  guestButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  note: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#388E3C",
  },
  username: {
    fontWeight: "bold",
    color: "#2E7D32",
  },
});

export default SignIn;
