import { useState, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';

const API_KEY = 'key';
const API_URL = 'url';

interface PlantSuggestion {
  name: string;
  probability: number;
}

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [results, setResults] = useState<PlantSuggestion[]>([]);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      setResults([]);
    }
  }

  async function identifyPlant() {
    if (!capturedImage) return;
    setIsIdentifying(true);
  
    try {
      const base64 = await FileSystem.readAsStringAsync(capturedImage, { encoding: FileSystem.EncodingType.Base64 });
  
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Api-Key': API_KEY },
        body: JSON.stringify({ images: [`data:image/jpeg;base64,${base64}`] }),
      });
  
      const data = await response.json();
      const suggestions = data.result?.classification?.suggestions || [];
  
      setResults(
        suggestions.length > 0
          ? suggestions.slice(0, 5).map(({ name, probability }) => ({ name, probability }))
          : [{ name: 'Unable to identify', probability: 0 }]
      );
    } catch (error) {
      console.error('Error identifying plant:', error);
      setResults([{ name: 'Error identifying plant', probability: 0 }]);
    } finally {
      setIsIdentifying(false);
    }
  }

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <ScrollView contentContainerStyle={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          {results.length > 0 ? (
            results.map((result, index) => (
              <Text key={index} style={styles.resultText}>
                {result.name} ({(result.probability * 100).toFixed(2)}%)
              </Text>
            ))
          ) : (
            <TouchableOpacity style={styles.button} onPress={identifyPlant} disabled={isIdentifying}>
              <Text style={styles.text}>{isIdentifying ? 'Identifying...' : 'Identify Plant'}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => {
            setCapturedImage(null);
            setResults([]);
          }}>
            <Text style={styles.text}>New Picture</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  previewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  preview: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
});