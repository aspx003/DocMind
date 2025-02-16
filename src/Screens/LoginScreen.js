import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { mvs, ms, s, vs } from "react-native-size-matters";
import OutlinedButton from "../Components/OutlinedButton";
import { AuthContext } from "../Context/auth-context";
import { loginUser } from "../Utils/general/authUtility";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  async function signInHandler() {

	if(!email && !password) {
		return Alert.alert("Please fill all fields!", "Try Again!");
	}

    setIsAuthenticating(true);

    try {
      const token = await loginUser(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert("Login Failed!", "Pls try again or contact your dev!");
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <ActivityIndicator size='large' />;
  }

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
      <OutlinedButton buttonName='Continue' onPress={signInHandler} />
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
