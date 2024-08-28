import React, { useContext, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
import { killPlant } from "../src/api";
import { UserContext } from "../Context/UserContext";

const GardenOption = (props) => {
  const { plant_id } = props;

  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDead, setIsDead] = useState(false);

  let navigation = useNavigation();

  const { loggedInUser } = useContext(UserContext);

  function handleGardenButtonOnPress() {
    setShowWarning(true);
  }

  function handleCancelModal() {
    setShowWarning(false);
  }

  function handleMoveToGraveyard() {
    setIsDead(true);
    setIsLoading(true);

    killPlant(loggedInUser.username, plant_id, true)
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
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <View style={styles.warningHeader}>
                  <Text style={styles.headerText}>Warning!</Text>
                </View>
                <View style={styles.warningBody}>
                  {isError ? (
                    <Text style={styles.error}>Something went wrong and we coudn't remove your plant - please try again!</Text>
                  ) : (
                    <Text>This will move your plant to the plant graveyard, are you sure you want to do this?</Text>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.modalCancel} onPress={handleCancelModal}>
                    <Text style={styles.text}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalConfirm} onPress={handleMoveToGraveyard}>
                    <Text style={styles.text}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleGardenButtonOnPress}>
        <Text style={styles.text}>Move to Garden</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GardenOption;

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#66BB6A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
    marginBottom: 10,
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
    backgroundColor: "#66BB6A",
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
  error: {
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
