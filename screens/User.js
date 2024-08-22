import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function User() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  //const username = loggedInUser.username;

  const [backgroundColour, setBackgroundColour] = useState("#D5F2E2");
  const [profilePicture, setProfilePicture] = useState({});
  // const [newUsername, setNewUsername] = useState({ username });

  let navigation = useNavigation();

  function handleCameraPress() {
    navigation.navigate("Camera");
  }

  const handleSignOut = () => {
    setLoggedInUser(null);
    navigation.navigate("WelcomeScreen");
    return;
  };

  if (!loggedInUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not logged in.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable
          style={styles.namePressable}
          name="camera"
          onPress={handleCameraPress}
        >
          <Image
            source={{ uri: loggedInUser.profile_picture }}
            style={styles.profile_picture}
          />
        </Pressable>

        <Text style={styles.username}>{loggedInUser.username}</Text>
        <Text style={styles.name}>{loggedInUser.name}</Text>
        <Text style={styles.email}>{loggedInUser.email}</Text>
        <Text style={styles.reward_points}>
          Reward points: {loggedInUser.reward_points}
        </Text>
        <Text style={styles.plants}>
          I own {loggedInUser.plants.length} plants!
        </Text>
        <Text style={styles.created_at}>Joined {loggedInUser.created_at}</Text>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f3e1",
  },

  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
  },

  username: {
    fontSize: 30,
    fontFamily: "Georgia",
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
    borderColor: "#B4D9A5",
  },
  signOutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#FF6F61",
    borderRadius: 5,
  },
  signOutText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});
