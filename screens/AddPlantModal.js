import { Text, Modal, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AddPlantCard from "../Components/AddPlantCard";
import { AntDesign } from "@expo/vector-icons";

function AddPlantModal(props) {
  const { isModalVisible, setIsModalVisible, plantList, plantLocation, plantNickname } = props;

  function handleButtonPress() {
    setIsModalVisible(false);
  }

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={handleButtonPress}>
          <AntDesign name="close" style={styles.closeButton}></AntDesign>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.modalTitle}>Found Plants</Text>
          <Text style={styles.text}>
            Looks like we found a few plants that match that name! Please select which one looks like your plant to add to your collection!
          </Text>
          <View>
            {plantList.map((plant) => {
              return <AddPlantCard key={plant.id} plant={plant} plantLocation={plantLocation} plantNickname={plantNickname}></AddPlantCard>;
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
  scrollViewContent: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2E7D32",
  },
  closeButton: {
    marginLeft: 8,
    marginTop: 8,
    fontSize: 30,
    color: "#2E7D32",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 14,
    color: "#388E3C",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default AddPlantModal;
