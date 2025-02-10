import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OutlinedButton from "../Components/OutlinedButton";
import { mvs, vs, s, ms } from "react-native-size-matters";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerContainerText}>Doc Mind</Text>
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton
          buttonName='Welcome Back'
          onPress={() => navigation.navigate("Login")}
        />
        <View style={styles.orTextContainer}>
          <View style={styles.bar}></View>
          <Text style={styles.orText}>or</Text>
          <View style={styles.bar}></View>
        </View>
        <OutlinedButton
          buttonName='Get Started'
          onPress={() => navigation.navigate("Register")}
        />
      </View>
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
  orTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: vs(15),
    gap: ms(3),
  },
  bar: {
    height: 0,
    borderWidth: ms(1),
    width: s(35),
  },
  orText: {
    fontSize: ms(20),
  },
});
