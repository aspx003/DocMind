import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { ms, vs, s } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import FileDisplay from "../Components/FileDisplay";
import Button from "../Components/Button";
import { getAllDocuments } from "../state/documentsSlice";
import * as DocumentPicker from "expo-document-picker";
import { AuthContext } from "../Context/auth-context";

export default function MainAppScreen({}) {
  const dispatch = useDispatch();

  const { loading, documents, error } = useSelector((state) => state.documents);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const token = authContext.token;
    dispatch(getAllDocuments({ token }));
  }, []);

  let screenContent;

  if (loading) {
    screenContent = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (error) {
    screenContent = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Some error happened!</Text>
      </View>
    );
  }

  if (documents && documents.length > 0) {
    screenContent = (
      <FlatList
        data={documents}
        renderItem={({ item }) => <FileDisplay item={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  } else {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No documents added! Add one to get started!</Text>
    </View>;
  }

  // TODO: Do file picking at last
  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
      console.log(docRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filesContainer}>{screenContent}</View>
      <View style={styles.mainContainer}>
        <View style={styles.addButtonContainer}>
          <View style={{width: s(300)}}>
            <Button buttonName='Add New Document' onPress={pickSomething} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: ms(25),
  },
  header: {
    paddingVertical: vs(20),
  },
  filesContainer: {
    minHeight: vs(510),
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
	marginBottom: vs(20),
  },
});
