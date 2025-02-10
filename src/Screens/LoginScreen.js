import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { mvs, ms, s, vs } from "react-native-size-matters";
import OutlinedButton from "../Components/OutlinedButton";
import { login } from "../Utils/ApiUtils/server.js";
import { useDispatch } from "react-redux";
import { setAuth } from "../state/authSlice.js";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = async () => {
	const response = await login(email, password);
	if(response) {
		dispatch(setAuth(response));
	} else {
		Alert.alert('Invalid email or password!');
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
    fontSize: ms(20),
  },
  formContainer: {
    marginVertical: vs(25),
  },
  textInput: {
    paddingVertical: vs(10),
    paddingHorizontal: s(5),
    borderWidth: s(1),
    borderRadius: ms(10),
    width: s(300),
    marginVertical: vs(5),
  },
});
