import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "../Components/PushNotification";
import Loading from "../Components/Loading";

export default function User() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {setIsLoading(false)}, 2000)

  let navigation = useNavigation();

  function handleCameraPress() {
    navigation.navigate("Camera");
  }

  const handleSignOut = () => {

    setLoggedInUser(null);
    setTimeout(() => {}, setIsLoading(false))

    setLoggedInUser({});

    navigation.navigate("WelcomeScreen");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!loggedInUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not logged in.</Text>
      </View>
    );
  }

  if(isLoading){
    return <Loading/>
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: loggedInUser.profile_picture }}
            style={styles.profile_picture}
          />

          <Text style={styles.username}>{loggedInUser.username}</Text>
          <Text style={styles.infoText}>{loggedInUser.name}</Text>
          <Text style={styles.infoText}>{loggedInUser.email}</Text>
          <Text style={styles.infoText}>Reward points: {loggedInUser.reward_points}</Text>
          <Text style={styles.infoText}>I own {loggedInUser.plants.length} plants!</Text>
          <Text style={styles.infoText}>Joined {formatDate(loggedInUser.created_at)}</Text>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <PushNotification showInstantButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  profileContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profile_picture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#66BB6A",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#388E3C",
    marginBottom: 5,
    textAlign: "center",
  },
  signOutButton: {
    backgroundColor: "#EF5350",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  signOutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
  },
});
