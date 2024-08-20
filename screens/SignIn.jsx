// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";

// const users = [
//   "tickle122",
//   "grumpy19",
//   "happyamy2016",
//   "cooljmessy",
//   "weegembump",
//   "jessjelly",
// ];

// const SignIn = ({ setCurrentUser }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = () => {
//     setError("");
//     if (users.includes(username) && password === "password") {
//       setCurrentUser(username);
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   const handleGuestAccess = () => {
//     setCurrentUser("guest");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign In</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.guestButton} onPress={handleGuestAccess}>
//         <Text style={styles.guestButtonText}>Continue as Guest</Text>
//       </TouchableOpacity>
//       <Text style={styles.note}>
//         Note: Password for all accounts is "password"
//       </Text>
//       <Text style={styles.note}>Available usernames:</Text>
//       {users.map((user) => (
//         <Text key={user} style={styles.username}>
//           {user}
//         </Text>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   error: {
//     color: "red",
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#C0DEAD",
//     padding: 10,
//     borderRadius: 5,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "black",
//     fontSize: 16,
//   },
//   guestButton: {
//     backgroundColor: "#ed8a53",
//     padding: 10,
//     borderRadius: 5,
//     width: "100%",
//     alignItems: "center",
//   },
//   guestButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
//   note: {
//     marginTop: 20,
//     fontStyle: "italic",
//   },
//   username: {
//     fontWeight: "bold",
//   },
// });

// export default SignIn;
