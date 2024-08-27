import React, { useContext, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";
import { deletePlantById } from "../src/api";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../Context/UserContext";

export default function DeletePlant(props) {
  const { plant_id } = props;
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  let navigation = useNavigation();

  function handleDeleteButtonOnPress() {
    setShowWarning(true);
  }

  function handleCancelModal() {
    setShowWarning(false);
  }

  function handleDeleteOnPress() {
    setIsLoading(true);
    deletePlantById(loggedInUser.username, plant_id)
      .then(() => {
        setIsLoading(false);
        navigation.navigate("My Plant Collection", { plant_id });
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }

  return (
    <View>
      <Modal visible={showWarning} transparent>
        <View style={styles.modalContentsContainer}>
          <View style={styles.warningModal}>
            <View style={styles.warningHeader}>
              <Text style={styles.headerText}>Warning!</Text>
            </View>
            <View style={styles.warningBody}>
              <Text>Are you sure you want to remove this plant from your collection?</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalCancel} onPress={handleCancelModal}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={handleDeleteOnPress}>
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleDeleteButtonOnPress}>
        <Text style={styles.text}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#dc0000",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
  },
  modalCancel: {
    backgroundColor: "#81C784",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
  },
  modalConfirm: {
    backgroundColor: "#dc0000",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FFFFFF",
  },
  warningModal: {
    width: 300,
    height: 200,
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  modalContentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warningHeader: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dc0000",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  warningBody: {
    justifyContent: "center",
    alignItems: "center",
    height: 75,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 50,
  },
});
