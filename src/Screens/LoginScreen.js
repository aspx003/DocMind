import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { mvs } from "react-native-size-matters";
import OutlinedButton from "../Components/OutlinedButton";
import { login } from "../Utils/ApiUtils/server.js";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const loginHandler = async () => {
    
	const response = login(email, password);
	if(response) {
		setData(response);
	}

  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerContainerText}>Welcome Back</Text>
      </View>
      <View>
        <Text style={styles.captionText}>Good to have you back!</Text>
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
          secureTextEntry={true}
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <OutlinedButton buttonName='Continue' onPress={loginHandler} />
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
    marginBottom: mvs(25),
  },
  headerContainerText: {
    fontSize: mvs(40),
    fontWeight: "bold",
  },
  captionText: {
    fontSize: 20,
  },
  formContainer: {
    marginVertical: 25,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 320,
    marginVertical: 5,
  },
});
