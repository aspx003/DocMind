import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ms, vs, s } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import FileDisplay from "../Components/FileDisplay";
import Button from "../Components/Button";
import { getAllDocuments, uploadDocument } from "../state/documentsSlice";
import * as DocumentPicker from "expo-document-picker";
import { AuthContext } from "../Context/auth-context";

export default function FileQuery({}) {
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

  const pickFile = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      Alert.alert(
        "Confirmation",
        `Do you want to upload ${docRes.assets[0].name}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              const token = authContext.token;
              const formData = new FormData();
              formData.append("file", {
                uri: docRes.assets[0].uri,
                name: docRes.assets[0].name,
                type: docRes.assets[0].mimeType,
              });
              dispatch(uploadDocument({ token, formData }));
              dispatch(getAllDocuments({ token }));
            },
            style: "default",
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filesContainer}>{screenContent}</View>
      <View style={styles.mainContainer}>
        <View style={styles.addButtonContainer}>
          <View style={{ width: s(300) }}>
            <Button buttonName='Add New Document' onPress={pickFile} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	marginBottom: vs(5),
  },
  headerText: {
    fontSize: ms(25),
  },
  filesContainer: {
    marginBottom: vs(10),
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
	marginBottom: vs(5)
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
