import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
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
      console.error(error);
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

  return (
    <View style={styles.container}>
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
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default RegisterScreen;
