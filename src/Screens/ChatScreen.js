import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useState, useContext, useRef, useLayoutEffect } from 'react';
import ChatComponent from '../Components/ChatComponent';
import IconButton from '../Components/IconButton';
import { AuthContext } from '../Context/auth-context';
import { colors } from '../constants/colors';
import { vs, s, ms } from 'react-native-size-matters';
import { useGetChatsQuery, usePostChatMutation } from '../state/chatApi';

export default function ChatScreen({ navigation, route }) {
  const { documentId, fileName } = route.params;
  const token = useContext(AuthContext).token;
  const {
    data,
    isLoading: loading,
    isError: error,
    refetch,
  } = useGetChatsQuery({ token, documentId });
  const [postChat, { isLoading: isPosting, error: postError }] =
    usePostChatMutation();

  const flatlistRef = useRef(null);
  const [message, setMessage] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Chatting with ' + fileName,
    });
  });

  function sendMessageHandler() {
    if (message.length === 0) {
      Alert.alert('Please enter a message!');
      return;
    }

    Keyboard.dismiss();
    postChat({ token, documentId, message });
    refetch();
    setMessage('');
  }

  if (error) {
    Alert.alert("We're facing some error currently. Please try again later!");
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatComponent chat={item} />}
      />
      <View style={styles.chatInputContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
          placeholder="Ask me a question!"
          placeholderTextColor="black"
        />
        <View style={styles.iconButton}>
          {isPosting ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <IconButton
              onPress={sendMessageHandler}
              name={'rocket-launch'}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '88%',
    paddingLeft: s(10),
  },
  iconButton: {
    padding: s(5),
    backgroundColor: colors.sendIconBackgroundColor,
    borderRadius: ms(25),
  },
});
