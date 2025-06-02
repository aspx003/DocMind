import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState, useContext, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatComponent from "../Components/ChatComponent";
import IconButton from "../Components/IconButton";
import { AuthContext } from "../Context/auth-context";
import { sendMessage } from "../state/chatSlice";
import { colors } from "../constants/colors";
import { vs, s, ms } from "react-native-size-matters";
import { isTokenExpired } from "../Utils/general/tokenUtility";

export default function ChatScreen({ navigation, route }) {
  const flatlistRef = useRef(null);
  const dispatch = useDispatch();
  const { documentId, fileName } = route.params;
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Chatting with " + fileName,
    });
  });

  const { allChats, loading, error } = useSelector((state) => state.chats);

  function sendMessageHandler() {
    if (message.length === 0) {
      Alert.alert("Please enter a message!");
      return;
    }

    Keyboard.dismiss();
    dispatch(sendMessage({ documentId, message, token: authContext.token }));
    setMessage("");
  }

  if (error) {
    Alert.alert("We're facing some error currently. Please try again later!");
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
          placeholder='Ask me a question!'
		  placeholderTextColor='black'
        />
        <View style={styles.iconButton}>
          {loading ? (
            <ActivityIndicator size='large' color='#0000ff' />
          ) : (
            <IconButton
              onPress={sendMessageHandler}
              name={"rocket-launch"}
              size={30}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: vs(5),
  },
  chatInputContainer: {
    height: vs(40),
    marginVertical: vs(10),
    backgroundColor: colors.buttonColor,
    padding: s(5),
    borderRadius: ms(35),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "88%",
    paddingLeft: s(10),
  },
  iconButton: {
    padding: s(5),
    backgroundColor: colors.sendIconBackgroundColor,
    borderRadius: ms(25),
  },
});
