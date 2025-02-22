import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { ms, mvs } from "react-native-size-matters";
import {colors} from '../constants/colors';

export default function Button({ onPress, buttonName }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.btnOpacity]}
      onPress={onPress}>
      <Text style={styles.btnText}>{buttonName}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: mvs(41),
	backgroundColor: colors.buttonColor,
    height: ms(41),
  },
  btnText: {
    fontSize: 18,
  },
  btnOpacity: {
    opacity: 0.3,
  },
});
