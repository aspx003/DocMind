import React, { useContext, useState } from "react";
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
import { AuthContext } from "../Context/auth-context";
import { loginUser, fetchUserProfile } from "../Utils/general/authUtility";
import { colors } from "../constants/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  async function signInHandler() {
    if (!email && !password) {
      return Alert.alert("Please fill all fields!", "Try Again!");
    }

    setIsAuthenticating(true);

    try {
      const token = await loginUser(email, password);
      const username = await fetchUserProfile(token);
      authContext.authenticate(token, username);
    } catch (error) {
      Alert.alert("Login Failed!", "Pls try again or contact your dev!");
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' color={colors.buttonColor} />;
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerContainerText}>Login</Text>
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
        <Button buttonName='Continue' onPress={signInHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: mvs(25),
  },
  headerContainerText: {
    fontSize: mvs(40),
    fontWeight: "bold",
    color: colors.textColor,
  },
  captionText: {
    fontSize: ms(20),
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
