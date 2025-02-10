import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { ms, mvs } from "react-native-size-matters";

export default function OutlinedButton({ onPress, buttonName }) {
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
    borderWidth: mvs(1),
    borderRadius: mvs(37),
    width: mvs(280),
    height: ms(44),
  },
  btnText: {
    fontSize: 18,
  },
  btnOpacity: {
    opacity: 0.3,
  },
});
