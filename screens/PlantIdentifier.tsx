import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const API_KEY = 'put key here';
const API_URL = 'https://plant.id/api/v3/identification';

interface PlantSuggestion {
  name: string;
  probability: number;
}

interface PlantIdentifierProps {
  capturedImage: string | null;
  onNewPicture: () => void;
}

export default function PlantIdentifier({ capturedImage, onNewPicture }: PlantIdentifierProps) {
  const [results, setResults] = useState<PlantSuggestion[]>([]);
  const [isIdentifying, setIsIdentifying] = useState(false);

  async function identifyPlant() {
    if (!capturedImage) return;
    setIsIdentifying(true);
  
    try {
      const base64 = await FileSystem.readAsStringAsync(capturedImage, { encoding: FileSystem.EncodingType.Base64 });
  
      const response = await axios.post(API_URL, 
        { images: [`data:image/jpeg;base64,${base64}`] },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Api-Key': API_KEY
          }
        }
      );
      const suggestions = response.data.result?.classification?.suggestions || [];
  
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
    <ScrollView contentContainerStyle={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={onNewPicture}>
        <Text style={styles.text}>New Picture</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  resultText: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
});