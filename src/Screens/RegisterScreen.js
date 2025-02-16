import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { mvs, s, ms, vs } from "react-native-size-matters";
import OutlinedButton from "../Components/OutlinedButton";
import { registerUser } from "../Utils/general/authUtility";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function registerHandler() {
    setIsAuthenticating(true);
    try {
      await registerUser(username, email, password);
    } catch (error) {
      Alert.alert("Register Failed!", "Pls try again or contact your dev!");
    }
    setIsAuthenticating(false);
	navigation.replace('Login');
  }

  if(isAuthenticating) {
	return <ActivityIndicator size="large" />
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerContainerText}>Get Started</Text>
      </View>
      <View>
        <Text style={styles.captionText}>
          We’ll need your name and email address to get started.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType='email-address'
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Name'
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <OutlinedButton buttonName='Continue' onPress={registerHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    marginBottom: vs(25),
  },
  headerContainerText: {
    fontSize: mvs(40),
    fontWeight: "bold",
  },
  captionText: {
    fontSize: ms(20),
    textAlign: "center",
  },
  formContainer: {
    marginVertical: vs(25),
  },
  textInput: {
    paddingVertical: vs(10),
    paddingHorizontal: s(5),
    borderWidth: ms(1),
    borderRadius: ms(10),
    width: s(300),
    marginVertical: vs(5),
  },
});
