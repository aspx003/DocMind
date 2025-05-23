import { StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import { ms, mvs } from "react-native-size-matters";
import { colors } from "../constants/colors";

export default function Button({ onPress, buttonName, disabled, loading }) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        pressed && styles.btnOpacity,
        disabled && styles.disabled,
      ]}
      onPress={onPress}>
      {loading && <ActivityIndicator size='small' color={colors.white} />}
      {!loading && <Text style={styles.btnText}>{buttonName}</Text>}
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
    fontFamily: "Lato",
  },
  btnOpacity: {
    opacity: 0.3,
  },
  disabled: {
    opacity: 0.3,
  },
});
