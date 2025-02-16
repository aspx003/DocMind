import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import {s, ms, vs, mvs} from 'react-native-size-matters';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../Context/auth-context";
import { getAllChats } from "../state/chatSlice";

export default function FileDisplay({item}) {

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const authContext = useContext(AuthContext);

	function navigateToChat() {
		dispatch(getAllChats({documentId: item.id, token: authContext.token}));
		navigation.navigate('Chat', {
			documentId: item.id
		});
	}

  return (
    <Pressable onPress={navigateToChat} style={styles.container}>
      <View style={styles.extContainer}>
        <Text>{item.file_type}</Text>
      </View>
      <View style={styles.fileNameContainer}>
        <Text>{item.file_name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderWidth: ms(1),
		borderRadius: ms(10),
		minHeight: vs(50),
		marginBottom: vs(15)
	},
	extContainer: {
		width: s(50),
		borderRightWidth: ms(1),
		justifyContent: 'center',
		alignItems: 'center'
	},
	fileNameContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexShrink: 1,
		paddingHorizontal: s(10)
	}
});
