import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SQLQueryChatComponent from "../Components/SQLQueryChatComponent";
import { colors } from "../constants/colors";
import { vs, s, ms } from "react-native-size-matters";
import IconButton from "../Components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllSQLQueryChats, postSQLQueryChat } from "../state/sqlQuerySlice";
import { AuthContext } from "../Context/auth-context";

export default function SQLQueryScreen() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.sqlQuery);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    dispatch(getAllSQLQueryChats({ token: authContext.token }));
  }, []);

  const sendMessageHandler = () => {
    if (message.length <= 0) {
      Alert.alert("Can't send blank messages!");
      return;
    }

    dispatch(
      postSQLQueryChat({ natural_query: message, token: authContext.token })
    );
  };

  if(error) {
	Alert.alert('Oops! Some error happened! Please try again');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <SQLQueryChatComponent data={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.chatInputContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
          placeholder='Ask your query'
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
    marginBottom: vs(45),
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
