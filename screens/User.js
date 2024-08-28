import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "../Components/PushNotification";
import Loading from "../Components/Loading";
import LottieView from "lottie-react-native";

export default function User() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {setIsLoading(false)}, 1000)


  let navigation = useNavigation();

  function handleCameraPress() {
    navigation.navigate("Camera");
  }

  const handleSignOut = () => {
    setLoggedInUser(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!loggedInUser) {
    return <View style={styles.container}></View>;
  }

  const numberOfPlants = loggedInUser.plants ? loggedInUser.plants.length : 0;

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>


        <LottieView
               source={require('../ProfilePic.json')}
               autoPlay
               loop
               style={styles.profile_picture}
            />
          {/* <Image 
            source={{ uri: loggedInUser.profile_picture }}
            style={styles.profile_picture}
          /> */}

          <Text style={styles.username}>{loggedInUser.username}</Text>
          <Text style={styles.infoText}>{loggedInUser.name}</Text>
          <Text style={styles.infoText}>{loggedInUser.email}</Text>
          <Text style={styles.infoText}>Reward points: {loggedInUser.reward_points}</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoText}>I own </Text>
            <Text style={styles.infoTextBold}>{numberOfPlants}</Text>
            {numberOfPlants === 1 ? <Text style={styles.infoText}> plant!</Text> : <Text style={styles.infoText}> plants!</Text>}
          </Text>
          <Text style={styles.infoText}>Joined {formatDate(loggedInUser.created_at)}</Text>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 15,
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
  infoTextBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: 5,
    textAlign: "center",
  },

  signOutButton: {
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