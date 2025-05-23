import * as Clipboard from "expo-clipboard";
import {
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  FlatList,
} from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import { colors } from "../constants/colors";
import Markdown from "react-native-markdown-display";

const copyToClipboard = (data) => {
  const copyString = data.response + "\n\n" + data.sql_query + "\n\n";
  Clipboard.setStringAsync(copyString);
  ToastAndroid.show("Response copied to clipboard", ToastAndroid.SHORT);
};

export default function BrowseChatComponent({ data }) {
  return (
    <View>
      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Text style={{ color: colors.textColor }}>{data.message}</Text>
        </View>
      </View>
      <View style={styles.responseContainer}>
        <View style={styles.responseBox}>
          <Pressable onLongPress={() => copyToClipboard(data)}>
            <Markdown
              style={{
                body: { color: colors.textColor, fontSize: 16 },
                code_inline: {
                  backgroundColor: colors.recieveColor,
                  padding: 5,
                  borderRadius: 5,
                  color: colors.textColor,
                },
                fence: {
                  backgroundColor: colors.recieveColor,
                  padding: 5,
                  fontFamily: "monospace",
                  color: colors.textColor,
                },
              }}>
              {data.response}
            </Markdown>
          </Pressable>
          <View>
            <Text style={styles.headerText}>Sources</Text>
            <FlatList
              data={data.sources}
              keyExtractor={(item) => item.url}
              renderItem={({ item }) => (
                <Text style={styles.responseText}>{item.title}</Text>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row-reverse",
    marginTop: vs(8),
  },
  messageBox: {
    flexShrink: 1,
    justifyContent: "center",
    backgroundColor: colors.sendColor,
    minHeight: vs(25),
    borderBottomLeftRadius: ms(20),
    borderTopLeftRadius: ms(20),
    borderBottomRightRadius: ms(10),
    padding: ms(10),
  },
  responseContainer: {
    marginTop: vs(8),
  },
  responseBox: {
    flexShrink: 1,
    justifyContent: "center",
    backgroundColor: colors.recieveColor,
    minHeight: vs(25),
    borderBottomRightRadius: ms(20),
    borderTopRightRadius: ms(20),
    borderBottomLeftRadius: ms(10),
    padding: s(10),
  },
  headerText: {
    fontSize: 20,
    color: colors.textColor,
    fontWeight: "bold",
    marginBottom: vs(5),
  },
  responseText: {
    color: colors.textColor,
    marginBottom: vs(5),
  },
  queryFont: {
    fontVariant: ["tabular-nums"],
  },
  results: {
    // flex: 1,
    marginTop: vs(2),
  },
});
