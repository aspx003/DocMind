import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ChatComponent({ chat }) {
  return (
    <View>
      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Text>{chat.message}</Text>
        </View>
      </View>
      <View style={styles.responseContainer}>
        <View style={styles.responseBox}>
          <Text>{chat.response}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
	flexDirection: 'row-reverse',
	marginTop: 15
  },
  messageBox: {
	maxWidth: '80%',
	flexShrink: 1,
	justifyContent: 'center',
	backgroundColor: '#87FFC7',
	minHeight: 50,
	borderBottomLeftRadius: 20,
	borderTopLeftRadius: 20,
	borderBottomRightRadius: 10,
	padding: 10
  },
  responseContainer: {
	marginTop: 15
  },
  responseBox: {
	maxWidth: '80%',
	flexShrink: 1,
	justifyContent: 'center',
	backgroundColor: '#A3B2FF',
	minHeight: 50,
	borderBottomRightRadius: 20,
	borderTopRightRadius: 20,
	borderBottomLeftRadius: 10,
	padding: 10
  }
});
