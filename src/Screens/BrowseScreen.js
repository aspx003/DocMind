import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "../Components/Button";
import * as Clipboard from "expo-clipboard";
import { ms, s, vs } from "react-native-size-matters";
import { colors } from "../constants/colors";

export default function BrowseScreen() {
  const [url, setUrl] = useState("");

  const getUrlFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setUrl(text);
    }

    sendUrlAndNavigateToChat();
  };

  const sendUrlAndNavigateToChat = () => {
    console.log(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Paste / Type a URL to start chatting!
      </Text>
      <TextInput
        style={styles.textInput}
        value={url}
        onChangeText={(text) => setUrl(text)}
        placeholder='Enter URL here!'
      />
      <View style={styles.buttonContainer}>
        <View style={{ width: s(220) }}>
          <Button
            onPress={getUrlFromClipboard}
            buttonName='Paste from Clipboard & GO'
          />
        </View>
        <View style={{ width: s(60) }}>
          <Button onPress={sendUrlAndNavigateToChat} buttonName='GO' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  textInput: {
    width: "100%",
    height: vs(40),
    paddingHorizontal: s(20),
    backgroundColor: colors.buttonColor,
    borderRadius: ms(35),
    width: "100%",
    marginVertical: vs(15),
  },
  headerText: {
    color: colors.textColor,
    fontSize: ms(20),
    fontFamily: "Lato",
  },
});
