import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, View, KeyboardDismissHandler } from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import BrowseChatComponent from "../Components/BrowseChatComponent";
import IconButton from "../Components/IconButton";
import { colors } from "../constants/colors";
import { AuthContext } from "../Context/auth-context";
import { getAllChats, postChat } from "../state/browseSlice";

export default function BrowseChatScreen() {
  const dispatch = useDispatch();
  const flatlistRef = useRef(null);
  const [message, setMessage] = useState("");
  const { loading, chats, chatResponseLoading } = useSelector((state) => state.browse);
  const token = useContext(AuthContext).token;

  useEffect(() => {
    dispatch(getAllChats({ token }));
  }, []);

  useEffect(() => {
    if (chats.length > 0 && flatlistRef.current) {
      flatlistRef.current.scrollToEnd({ animated: false });
    }
  }, [chats]);

  const sendMessageHandler = () => {
    if (!message.trim()) return;

    dispatch(postChat({ token, message }));
    Keyboard.dismiss();
    setMessage("");

    setTimeout(() => {
      if (flatlistRef.current) {
        flatlistRef.current.scrollToEnd({ animated: false });
      }
    }, 300);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {loading && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size={"large"} color={colors.buttonColor} />
            </View>
          )}

          {!loading && <FlatList ref={flatlistRef} data={chats} keyExtractor={(item) => item.id} renderItem={({ item }) => <BrowseChatComponent data={item} />} contentContainerStyle={styles.flatListContent} />}

          <View style={styles.chatInputContainer}>
            <TextInput value={message} onChangeText={setMessage} style={styles.input} placeholder='Ask me a question!' placeholderTextColor='black' multiline />
            <View style={styles.iconButton}>{chatResponseLoading ? <ActivityIndicator size='small' color='#0000ff' /> : <IconButton onPress={sendMessageHandler} name={"rocket-launch"} size={24} />}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: s(10),
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.buttonColor,
    margin: s(10),
    paddingHorizontal: s(10),
    paddingVertical: s(5),
    borderRadius: ms(35),
  },
  input: {
    flex: 1,
    paddingLeft: s(10),
    maxHeight: vs(100),
    color: "black",
  },
  iconButton: {
    padding: s(6),
    backgroundColor: colors.sendIconBackgroundColor,
    borderRadius: ms(25),
    marginLeft: s(5),
  },
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
