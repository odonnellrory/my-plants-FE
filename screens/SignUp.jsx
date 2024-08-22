import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:9000/api/register", {
        username,
        name,
        email,
        password,
      });

      setUsername("");
      setName("");
      setEmail("");
      setPassword("");

      Alert.alert("Success", "User registered successfully");
      navigation.navigate("LoginScreen");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert("Error", "Bad request. Please check your input.");
            break;
          case 409:
            Alert.alert("Error", "Username or email already exists.");
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

  const handleLoginNavigate = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
        />
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        <Pressable style={styles.pressable} onPress={handleSubmit}>
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.loginNavigate} onPress={handleLoginNavigate}>
          <Text style={styles.loginText}>
            Already have an account? Log in here.
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8F5E9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  input: {
    backgroundColor: "#F1F8E9",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#81C784",
    marginBottom: 15,
  },
  pressable: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: "#66BB6A",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  loginNavigate: {
    marginTop: 20,
    alignSelf: "center",
  },
  loginText: {
    color: "#388E3C",
    textDecorationLine: "underline",
  },
});
export default RegisterScreen;
