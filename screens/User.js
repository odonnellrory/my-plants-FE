import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";


export default function User() {

  const { loggedInUser } = useContext(UserContext); 

  return (

    <View style={[styles.container]}>
      <ScrollView>

      <Image
          source={{ uri: loggedInUser.profile_picture }}
          style={styles.profile_picture}/>

        <Text style={[styles.username]}>{loggedInUser.username}</Text>
        <Text style={[styles.name]}>{loggedInUser.name}</Text>
        <Text style={[styles.email]}>{loggedInUser.email}</Text>
        <Text style={[styles.reward_points]}>Reward points: {loggedInUser.reward_points}</Text>
        <Text style={[styles.plants]}>I own {loggedInUser.plants.length} plants!</Text>
        <Text style={[styles.created_at]}>Joined {loggedInUser.created_at}</Text>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#D5F2E2",
    alignItems: "center",
    textAlign: 1,
   
  },

  username: {
 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 1
    
    
  },

  name: {

    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 1,
    margin: 1

  },

  email: {

    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 1,
    margin: 1

  },
  
  reward_points: {

    textAlign: 1,
    margin: 1

  },

  plants: {

    textAlign: 1,
    margin: 1
  },

  created_at: {

    textAlign: 1,
    margin: 1

  },
  profile_picture: {

    width: 120,
    height: 120,
    alignItems: "center",
    marginVertical: 50,
    marginLeft: 50,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#B4D9A5'

  }

 


 

});
