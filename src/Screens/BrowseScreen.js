import * as Clipboard from "expo-clipboard";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/Button";
import { colors } from "../constants/colors";
import { AuthContext } from "../Context/auth-context";
import { addNewUrl, getAllUrls, deleteUrl } from "../state/browseSlice";
import IconButton from "../Components/IconButton";
import { checkTokenValidity } from "../Utils/general/tokenUtility";

const UrlCheckbox = ({ item }) => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const handleDeleteUrl = () => {
    dispatch(
      deleteUrl({
        token: authContext.token,
        url: item.url,
      })
    );
    dispatch(getAllUrls({ token: authContext.token }));
  };

  return (
    <View style={styles.urlBox}>
      <Text style={styles.text}>{item.title}</Text>
      <IconButton
        color={"red"}
        name={"delete"}
        size={25}
        onPress={handleDeleteUrl}
      />
    </View>
  );
};

export default function BrowseScreen({ navigation }) {
  const [url, setUrl] = useState("");

  const { urls, loading } = useSelector((state) => state.browse);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  if(!checkTokenValidity(authContext.token)) {
	authContext.logout();
  }

  useEffect(() => {
    dispatch(getAllUrls({ token: authContext.token }));
  }, []);

  const getUrlFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setUrl(text);
    }
  };

  const handleAddNewUrl = () => {
    if (url) {
      dispatch(addNewUrl({ token: authContext.token, url }));
    } else {
      ToastAndroid.show("Please enter a link", ToastAndroid.SHORT);
    }
    setUrl("");
  };

  const handleChat = () => {
    navigation.navigate("BrowseChat");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={url}
        onChangeText={(text) => setUrl(text)}
        placeholder='Enter / Paste a Link'
		placeholderTextColor='black'
      />
      <View style={styles.buttonContainer}>
        <View style={{ width: "48%" }}>
          {url.length === 0 ? (
            <Button
              onPress={getUrlFromClipboard}
              buttonName='Add from Clipboard'
            />
          ) : (
            <Button onPress={() => setUrl("")} buttonName='Clear' />
          )}
        </View>
        <View style={{ width: "48%" }}>
          <Button
            onPress={handleAddNewUrl}
            buttonName='Add Link'
            disabled={url.length === 0}
          />
        </View>
      </View>

      {/* Links list */}
      <View style={styles.urlContainer}>
        <Text style={styles.headerText}>Added Links</Text>
        <View style={styles.urlDisplay}>
          {loading && (
            <ActivityIndicator size='large' color={colors.buttonColor} />
          )}
          {!loading && (urls.length === 0 ? (
            <Text style={styles.text}>No links added Yet!</Text>
          ) : (
            <FlatList
              keyExtractor={item => item.url_hash}
              data={urls}
              renderItem={({ item }) => <UrlCheckbox item={item} />}
            />
          ))}
        </View>
      </View>

      <View style={styles.chatButtonContainer}>
        <Button onPress={handleChat} buttonName='Chat' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: colors.textColor,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: s(10),
    width: "100%",
    justifyContent: "space-between",
  },
  textInput: {
    width: "100%",
    height: vs(35),
    backgroundColor: colors.buttonColor,
    borderRadius: ms(35),
    width: "100%",
    marginVertical: vs(10),
    paddingHorizontal: s(15),
  },
  headerText: {
    color: colors.textColor,
    fontSize: ms(20),
    fontFamily: "Lato",
    textAlign: "center",
  },
  urlContainer: {
    marginVertical: vs(10),
    flex: 1,
  },
  urlDisplay: {
    marginTop: vs(10),
    marginBottom: vs(10),
    backgroundColor: "#0B2B32",
    padding: s(10),
    borderRadius: ms(10),
  },
  chatButtonContainer: {
    marginVertical: vs(10),
  },
  urlBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: s(9),
    marginVertical: vs(5),
  },
});
