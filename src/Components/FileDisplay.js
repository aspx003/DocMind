import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { s, ms, vs, mvs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../Context/auth-context";
import { getAllChats } from "../state/chatSlice";
import { colors } from "../constants/colors";

export default function FileDisplay({ item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  function navigateToChat() {
    dispatch(getAllChats({ documentId: item.id, token: authContext.token }));
    navigation.navigate("Chat", {
      documentId: item.id,
	  fileName: item.file_name,
    });
  }

  let icon = null;

  switch (item.file_type) {
    case "pdf":
      icon = require("../../assets/file-type-icons/icon_pdf.png");
      break;
    case "csv":
      icon = require("../../assets/file-type-icons/icon_csv.png");
      break;
    case "txt":
      icon = require("../../assets/file-type-icons/icon_txt.png");
      break;
    case "xlsx":
      icon = require("../../assets/file-type-icons/icon_xlsx.png");
      break;
    default:
      break;
  }

  return (
    <Pressable onPress={navigateToChat} style={styles.container}>
      <View style={styles.extContainer}>
        <Image style={styles.imageStyle} source={icon} />
      </View>
      <View style={styles.fileNameContainer}>
        <Text style={styles.textStyle}>{item.file_name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: ms(10),
    minHeight: vs(50),
    marginBottom: vs(15),
    backgroundColor: colors.documentCardColor,
    elevation: 5,
  },
  extContainer: {
    width: s(50),
    justifyContent: "center",
    alignItems: "center",
  },
  fileNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
    paddingHorizontal: s(10),
  },
  textStyle: {
    color: colors.textColor,
  },
  imageStyle: {
    height: vs(28),
    width: s(28),
  },
});
