import { useState, useEffect, useRef } from "react";
import {
  Camera,
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function Camerajs() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  useEffect(() => {
    async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    };
  }, []);
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        FlashMode={flash}
        ref={cameraRef}
      >
        <Text>hello</Text>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
