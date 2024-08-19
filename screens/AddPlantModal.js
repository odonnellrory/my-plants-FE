import React from "react";
import { Modal, Pressable, Text } from "react-native";

export default function AddPlantModal(props) {
  const { isModalVisible, setIsModalVisible } = props;

  function handlePress() {
    setIsModalVisible(false);
  }

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <Text>I AM A Modal</Text>
      <Pressable onPress={handlePress}>
        <Text>hello</Text>
      </Pressable>
    </Modal>
  );
}
