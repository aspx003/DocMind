import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import Button from "../Components/Button";
import * as Clipboard from "expo-clipboard";
import { ms, s, vs } from "react-native-size-matters";
import { colors } from "../constants/colors";
import Checkbox from "expo-checkbox";
import { useSelector, useDispatch } from "react-redux";
import { addNewUrl, getAllUrls } from "../state/browseSlice";
import { AuthContext } from "../Context/auth-context";

const UrlCheckbox = ({ item, onCheckChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const changeCheck = (value) => {
    setIsChecked(value);
    onCheckChange(item, value);
  };
  return (
    <View style={styles.urlBox}>
      <Checkbox value={isChecked} onValueChange={changeCheck} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
};

export default function BrowseScreen({ navigation }) {
  const [url, setUrl] = useState("");
  const localUrls = new Set();

  const { urls, loading, error } = useSelector((state) => state.browse);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

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

  const onCheckChange = (item, value) => {
    if (value) {
      localUrls.add({
        hash: item.url_hash,
        url: item.url,
      });
    } else {
      localUrls.forEach((url) => {
        if (url.hash === item.url_hash) {
          localUrls.delete(url);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={url}
        onChangeText={(text) => setUrl(text)}
        placeholder='Enter / Paste a Link'
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
            loading={loading}
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
          {urls.length === 0 ? (
            <Text style={styles.text}>No links added Yet!</Text>
          ) : (
            <FlatList
              keyExtractor={(item) => item.url_hash}
              data={urls}
              renderItem={({ item }) => (
                <UrlCheckbox item={item} onCheckChange={onCheckChange} />
              )}
            />
          )}
        </View>
      </View>

      <View style={styles.chatButtonContainer}>
        <Button onPress={() => console.log(localUrls)} buttonName='Chat' />
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
    // height: "100%",
  },
  chatButtonContainer: {
    marginVertical: vs(10),
  },
  urlBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(9),
    marginVertical: vs(5),
  },
});
