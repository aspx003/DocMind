import { useContext,useEffect,useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import { ms,s,vs } from "react-native-size-matters";
import { useDispatch,useSelector } from "react-redux";
import BrowseChatComponent from "../Components/BrowseChatComponent";
import IconButton from "../Components/IconButton";
import { colors } from "../constants/colors";
import { AuthContext } from "../Context/auth-context";
import { getAllChats,postChat } from "../state/browseSlice";

export default function BrowseChatScreen() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, chats } = useSelector((state) => state.browse);
  const token = useContext(AuthContext).token;

  useEffect(() => {
    dispatch(getAllChats({ token }));
  }, []);

  const sendMessageHandler = () => {
    if (message) {
      dispatch(postChat({ token, message }));
    }
    Keyboard.dismiss();
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}>
      {loading && (
        <ActivityIndicator size={"large"} color={colors.buttonColor} />
      )}
      <FlatList
        data={chats}
        initialNumToRender={5} // Only render a few items initially
        maxToRenderPerBatch={5} // Number of items rendered per batch
        windowSize={10} // Number of items kept in memory
        updateCellsBatchingPeriod={50}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BrowseChatComponent data={item} />}
      />
      <View style={styles.chatInputContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
          placeholder='Ask me a question!'
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
