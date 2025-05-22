import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { mvs, s, vs } from "react-native-size-matters";
import Button from "../Components/Button";
import { colors } from "../constants/colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../../assets/splash-image.png")}
        resizeMode='cover'
        style={styles.backgroundImage}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>Doc Mind</Text>
          <Text style={styles.headerCaption}>
            An Intelligent Multi-Modal Framework for Context-Aware Document
            Analysis and Natural Language Database Orchestration
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              buttonName='Welcome Back'
              onPress={() => navigation.navigate("Login")}
            />
          </View>
          <View style={styles.button}>
            <Button
              buttonName='Get Started'
              onPress={() => navigation.navigate("Register")}
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
    marginBottom: vs(5),
  },
  headerContainer: {
    marginBottom: mvs(10),
  },
  headerContainerText: {
    fontSize: mvs(40),
    color: colors.textColor,
    fontFamily: "Montserrat",
  },
  headerCaption: {
    fontSize: mvs(15),
    color: colors.textColor,
    fontFamily: "Lato",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: s(150),
  },
});
