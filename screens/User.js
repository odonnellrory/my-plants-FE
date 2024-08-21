

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";


export default function User() {

  const { loggedInUser } = useContext(UserContext); 
  const username = loggedInUser.username;

  const [backgroundColour, setBackgroundColour] = useState("#D5F2E2");
  const [profilePicture, setProfilePicture] = useState({});
  const [newUsername, setNewUsername] = useState({ username });

  let navigation = useNavigation();

  function handleCameraPress() {
    navigation.navigate("Camera");
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable style={styles.namePressable} name="camera" onPress={handleCameraPress}>
          <Image 
            source={{ uri: loggedInUser.profile_picture }} 
            style={styles.profile_picture} 
          />
        </Pressable>

        <Text style={styles.username}>{loggedInUser.username}</Text>
        <Text style={styles.name}>{loggedInUser.name}</Text>
        <Text style={styles.email}>{loggedInUser.email}</Text>
        <Text style={styles.reward_points}>Reward points: {loggedInUser.reward_points}</Text>
        <Text style={styles.plants}>I own {loggedInUser.plants.length} plants!</Text>
        <Text style={styles.created_at}>Joined {loggedInUser.created_at}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",     
    backgroundColor: "#D5F2E2",
  },

  scrollContainer: {
    alignItems: "center",       
    justifyContent: "center",  
    width: "100%",
    paddingVertical: 20,
  },

  username: {
    fontSize: 30,
    fontFamily: 'Georgia',
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 10,
  },

  name: {
    textAlign: "center",
    marginBottom: 5,
  },

  email: {
    textAlign: "center",
    marginBottom: 5,
  },
  
  reward_points: {
    textAlign: "center",
    marginBottom: 5,
  },

  plants: {
    textAlign: "center",
    marginBottom: 5,
  },

  created_at: {
    textAlign: "center",
    marginBottom: 5,
  },

  profile_picture: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#B4D9A5',
  },
});



 


