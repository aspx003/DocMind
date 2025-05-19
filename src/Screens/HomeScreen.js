import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Components/Button";
import { mvs, vs, s, ms } from "react-native-size-matters";
import { StatusBar } from "expo-status-bar";
import {colors} from '../constants/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <StatusBar style='light' />
      <ImageBackground
        source={require("../../assets/splash-image.png")}
        resizeMode='cover'
        style={styles.backgroundImage}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>Doc Mind</Text>
          <Text style={styles.headerCaption}>
		  An Intelligent Multi-Modal Framework for Context-Aware Document Analysis and Natural Language Database Orchestration
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              buttonName='Welcome Back'
              onPress={() => navigation.replace("Login")}
            />
          </View>
          <View style={styles.button}>
            <Button
              buttonName='Get Started'
              onPress={() => navigation.replace("Register")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: s(20),
  },
  headerContainer: {
    marginBottom: mvs(25),
  },
  headerContainerText: {
    fontSize: mvs(40),
    color: colors.textColor,
	fontFamily: 'Montserrat'
  },
  headerCaption: {
    fontSize: mvs(15),
    color: colors.textColor,
	fontFamily: 'Lato'
  },
  orTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: vs(15),
    gap: ms(3),
  },
  buttonContainer: {
    marginBottom: mvs(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: s(150),
  },
});
