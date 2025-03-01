import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { s, vs } from "react-native-size-matters";
import { sayHi } from "../Utils/general/hi";
import { colors } from "../constants/colors";
import { AuthContext } from "../Context/auth-context";
import IconButton from "../Components/IconButton";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function FunctionalitySelectionScreen() {
  const { helloText, language } = sayHi();
  const naviagation = useNavigation();

  const authContext = useContext(AuthContext);
  const username = authContext.username;

  const slideIn = useSharedValue(300);
  const slideIn2 = useSharedValue(-300);

  const animatedStyleFromRight = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideIn.value }],
    };
  });

  const animatedStyleFromLeft = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideIn2.value }],
    };
  });

  React.useEffect(() => {
    slideIn.value = withTiming(0, { duration: 500 });
	slideIn2.value = withTiming(0, { duration: 500 });
  }, []);

  function documentNaviagtor() {
    naviagation.navigate("FileQuery");
  }

  function sqlNavigator() {
    naviagation.navigate("SQLQuery");
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoutButton}>
        <IconButton size={24} name={"logout"} onPress={authContext.logout} />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={{ color: colors.buttonColor }}>{language}</Text>
          <Text style={styles.helloText}>{helloText}</Text>
        </View>
        <Text style={styles.hiText}> {username},</Text>
      </View>
      <Text style={styles.hiTextCaption}>Where should we start today?</Text>
      <Animated.View style={[styles.docContainer, animatedStyleFromLeft]}>
        <Pressable style={styles.navigator} onPress={documentNaviagtor}>
          <Text style={styles.navigatorText}>Take me to my documents!</Text>
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.sqlContainer, animatedStyleFromRight]}>
        <Pressable style={styles.navigator} onPress={sqlNavigator}>
          <Text style={styles.navigatorText}>
            I would like some help with SQL!
          </Text>
        </Pressable>
      </Animated.View>
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
    fontWeight: "bold",
  },
  hiTextCaption: {
    fontSize: s(27),
    color: colors.textColor,
  },
  helloText: {
    fontSize: s(33),
    color: colors.buttonColor,
    fontWeight: "bold",
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
    width: s(200),
    elevation: 5,
  },
  navigatorText: {
    fontSize: s(17),
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
