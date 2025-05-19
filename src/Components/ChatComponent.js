import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { vs, s, ms } from "react-native-size-matters";

export default function ChatComponent({ chat }) {
  return (
    <View>
      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Text style={styles.textStyles}>{chat.message}</Text>
        </View>
      </View>
      <View style={styles.responseContainer}>
        <View style={styles.responseBox}>
          <Text style={styles.textStyles}>{chat.response}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row-reverse",
    marginTop: vs(8),
  },
  messageBox: {
    maxWidth: "80%",
    flexShrink: 1,
    justifyContent: "center",
    backgroundColor: colors.sendColor,
    minHeight: vs(25),
    borderBottomLeftRadius: ms(20),
    borderTopLeftRadius: ms(20),
    borderBottomRightRadius: ms(10),
    padding: ms(10),
  },
  responseContainer: {
    marginTop: vs(8),
  },
  responseBox: {
    maxWidth: "80%",
    flexShrink: 1,
    justifyContent: "center",
    backgroundColor: colors.recieveColor,
    minHeight: vs(25),
    borderBottomRightRadius: ms(20),
    borderTopRightRadius: ms(20),
    borderBottomLeftRadius: ms(10),
    padding: s(10),
  },
  textStyles: { color: colors.textColor, fontFamily: "Lato", fontSize: vs(13) },
});
