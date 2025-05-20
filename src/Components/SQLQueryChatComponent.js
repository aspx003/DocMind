import * as Clipboard from "expo-clipboard";
import { Pressable,StyleSheet,Text,ToastAndroid,View } from "react-native";
import { ms,s,vs } from "react-native-size-matters";
import { colors } from "../constants/colors";
import TableComponent from "./TableComponent";

const copyToClipboard = (data) => {
  const copyString = data.response + "\n\n" + data.sql_query + "\n\n";
  Clipboard.setStringAsync(copyString);
  ToastAndroid.show("Response copied to clipboard", ToastAndroid.SHORT);
};

export default function SQLQueryChatComponent({ data }) {
  return (
    <View>
      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Text style={{ color: colors.textColor }}>{data.natural_query}</Text>
        </View>
      </View>
      <Pressable
        onLongPress={() => copyToClipboard(data)}
        style={styles.responseContainer}>
        <View style={styles.responseBox}>
          <Text style={styles.headerText}>Response: </Text>
          <Text style={styles.responseText}>{data.response}</Text>
          <Text style={styles.headerText}>SQL Query: </Text>
          <Text style={[styles.responseText, styles.queryFont]}>
            {data.sql_query}
          </Text>
          <Text style={styles.headerText}>Results Table: </Text>
          <View style={styles.results}>
            <TableComponent data={data.results} />
          </View>
        </View>
      </Pressable>
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
