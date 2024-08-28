import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import PlantGravestone from "../Components/PlantGravestone";
import { UserContext } from "../Context/UserContext";
import { getDeadPlants } from "../src/api";
import Loading from "../Components/Loading";

const PlantGraveyard = () => {

    const { loggedInUser } = useContext(UserContext);
    const [plants, setplants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        getDeadPlants(loggedInUser.username).then((response) => {

            setplants(response)

            setIsLoading(false)
        
        }).catch((error) => {

            console.log(error)

        })

    }, [])

    if(isLoading){
        return <Loading/>
    }


    return (
        <View style={styles.container}>

           <Text style={styles.title}>The Plant Graveyard</Text> 

           <ScrollView style={styles.plants}>
            {plants.map((plant) => {
                return <PlantGravestone plant={plant} key={plant._id} />
            })}

           </ScrollView>

        </View>

    )
}

export default PlantGraveyard;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E8F5E9",
        alignItems: "center", 
        paddingTop: 20, 
    },
    title: {
        fontFamily: "Georgia",
        fontSize: 24,
        justifyContent: "center",
        alignContent: "center"
    }


   
});



