import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatComponent from "../Components/ChatComponent";
import IconButton from "../Components/IconButton";
import { AuthContext } from "../Context/auth-context";
import { sendMessage } from "../state/chatSlice";

export default function ChatScreen({ route }) {
	const flatlistRef = useRef(null);
  const dispatch = useDispatch();
  const { documentId } = route.params;
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const { allChats, loading, error } = useSelector((state) => state.chats);

  function sendMessageHandler() {
    Keyboard.dismiss();
    dispatch(sendMessage({ documentId, message, token: authContext.token }));
	setMessage("");
  }

  return (
    <View style={styles.container}>
      <FlatList
	  	ref={flatlistRef}
        data={allChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatComponent chat={item} />}
      />
      <View style={styles.chatInputContainer}>
        <TextInput
		  value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
        />
        <View>
          {loading ? (
            <ActivityIndicator size='large' color='#0000ff' />
          ) : (
            <IconButton onPress={sendMessageHandler} name={"send"} size={35} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatInputContainer: {
    height: 50,
    marginTop: 10,
    backgroundColor: "#87FFC7",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "88%",
  },
});
