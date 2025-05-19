import { useNavigation } from "@react-navigation/native";
import React,{ useContext } from "react";
import { Pressable,StyleSheet,Text,View } from "react-native";
import { s,vs } from "react-native-size-matters";
import IconButton from "../Components/IconButton";
import { colors } from "../constants/colors";
import { AuthContext } from "../Context/auth-context";
import { sayHi } from "../Utils/general/hi";

export default function FunctionalitySelectionScreen() {
  const { helloText, language } = sayHi();
  const naviagation = useNavigation();

  const authContext = useContext(AuthContext);
  const username = authContext.username;

  function documentNaviagtor() {
    naviagation.navigate("FileQuery");
  }

  function sqlNavigator() {
    naviagation.navigate("SQLQuery");
  }

  function browseNavigator() {
	naviagation.navigate("Browse");
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoutButton}>
        <IconButton size={24} name={"logout"} onPress={authContext.logout} />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={{ color: colors.buttonColor, fontFamily: 'Montserrat' }}>{language}</Text>
          <Text style={styles.helloText}>{helloText}</Text>
        </View>
        <Text style={styles.hiText}> {username},</Text>
      </View>
      <Text style={styles.hiTextCaption}>Where should we start today?</Text>
        <Pressable style={styles.navigator} onPress={documentNaviagtor}>
          <Text style={styles.navigatorText}>Take me to my documents!</Text>
        </Pressable>
        <Pressable style={styles.navigator} onPress={sqlNavigator}>
          <Text style={styles.navigatorText}>
            I would like some help with SQL!
          </Text>
        </Pressable>
        <Pressable style={styles.navigator} onPress={browseNavigator}>
          <Text style={styles.navigatorText}>
            I would like to browse the internet!
          </Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  hiText: {
    fontSize: s(33),
    color: colors.buttonColor,
	fontFamily: 'Montserrat'
  },
  hiTextCaption: {
    fontSize: s(27),
    color: colors.textColor,
	fontFamily: 'Lato'
  },
  helloText: {
    fontSize: s(33),
    color: colors.buttonColor,
    fontFamily: 'Montserrat'
  },
  docContainer: {
    alignItems: "flex-start",
  },
  sqlContainer: {
    alignItems: "flex-end",
  },
  navigator: {
    backgroundColor: colors.buttonColor,
    padding: s(10),
    borderRadius: s(10),
    marginVertical: vs(10),
    elevation: 5,
	alignItems: "center",
  },
  navigatorText: {
    fontSize: s(17),
	fontFamily: 'Lato'
  },
  logoutButton: {
    position: "absolute",
    top: vs(20),
    right: s(1),
    backgroundColor: colors.buttonColor,
    padding: s(7),
    borderRadius: s(20),
  },
});
