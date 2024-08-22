import { Text, Modal, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AddPlantCard from "../Components/AddPlantCard";

function AddPlantModal(props) {
    const { isModalVisible, setIsModalVisible, plantList } = props;

    return (
        <Modal
            visible={isModalVisible}
            animationType="slide" 
            transparent={true} 
        >
            <View style={styles.modalContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.modalTitle}>Results</Text>
               <View>
                {plantList.map((plant) => {

                    return   <AddPlantCard key={plant.id} plant={plant}> 

                    </AddPlantCard>

                })}
             

               </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92E7B0", 
    },
    scrollViewContent: {
        width: "90%",
        backgroundColor: "#92E7B0",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        paddingBottom: 70, 
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#fff",
    },
    closeButton: {
        position: "absolute",
        bottom: 20, 
        alignSelf: "center",
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    closeButtonText: {
        color: "#38D870",
        fontWeight: "bold",
    },
});

export default AddPlantModal;
