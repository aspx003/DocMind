import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ms, mvs, s, vs } from "react-native-size-matters";
import Button from "../Components/Button";
import { registerUser } from "../Utils/general/authUtility";
import { colors } from "../constants/colors";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function registerHandler() {

	if(!email && !username && !password) {
		return Alert.alert("Please fill all fields!", "Try Again!");
	}

    setIsAuthenticating(true);
    try {
      await registerUser(username, email, password);
    } catch (error) {
      Alert.alert("Register Failed!", "Pls try again or contact your dev!");
    }
    setIsAuthenticating(false);
    navigation.replace("Login");
  }

  if (isAuthenticating) {
    return <ActivityIndicator size='large' />;
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
		  placeholderTextColor={colors.placeholderTextColor}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Name'
          value={username}
          onChangeText={(text) => setUsername(text)}
		  placeholderTextColor={colors.placeholderTextColor}
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
		  placeholderTextColor={colors.placeholderTextColor}
        />
      </View>
	  <View style={styles.buttonContainer}>
      	<Button buttonName='Login' onPress={registerHandler} />
	  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
	paddingHorizontal: s(20),
  },
  headerContainer: {
    marginBottom: vs(25),
  },
  headerContainerText: {
    fontSize: mvs(40),
    fontWeight: "bold",
	color: colors.textColor,
  },
  captionText: {
    fontSize: ms(20),
    textAlign: "center",
	color: colors.textColor,
  },
  formContainer: {
    marginVertical: vs(25),
  },
  textInput: {
    paddingVertical: vs(10),
    paddingHorizontal: s(5),
    borderBottomWidth: s(1),
    width: s(300),
    marginVertical: vs(5),
    borderColor: colors.textColor,
    color: colors.textColor,
  },
  buttonContainer: {
	width: s(200),
  },
});
