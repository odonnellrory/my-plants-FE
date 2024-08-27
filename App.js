import { StatusBar, StyleSheet, View } from "react-native";

import { UserProvider } from "./Context/UserContext";

import RootStack from "./navigation/RootStack";

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <RootStack />
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
});
