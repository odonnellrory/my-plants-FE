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
  const { setLoggedInUser, setGuestUser } = useContext(UserContext); // Access the UserContext
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
      <Text style={styles.note}>
        Note: Password for all accounts is "password"
      </Text>
      <Text style={styles.note}>Available usernames:</Text>
      {users.map((user) => (
        <Text key={user} style={styles.username}>
          {user}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#C0DEAD",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  guestButton: {
    backgroundColor: "#ed8a53",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  guestButtonText: {
    color: "white",
    fontSize: 16,
  },
  note: {
    marginTop: 20,
    fontStyle: "italic",
  },
  username: {
    fontWeight: "bold",
  },
});

export default SignIn;
