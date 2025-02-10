import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { mvs } from "react-native-size-matters";
import OutlinedButton from "../Components/OutlinedButton";
import { register } from "../Utils/ApiUtils/server";
export default function RegisterScreen({navigation}) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [data, setData] = useState(null);
 

  const registerHandler = async () => {
	const reponse = register(username, email, password);
	
	if(reponse) {
		setData(reponse);
	}

	if(data && data._j.detail) {
		Alert.alert(data._j.detail + "!");
	}else {
		navigation.navigate('Login');
	}
  };

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
    marginBottom: mvs(25),
  },
  headerContainerText: {
    fontSize: mvs(40),
    fontWeight: "bold",
  },
  captionText: {
    fontSize: 20,
	textAlign: 'center'
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
