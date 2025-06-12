import { useContext } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import { ms, vs, s } from "react-native-size-matters";
import FileDisplay from "../Components/FileDisplay";
import Button from "../Components/Button";
import * as DocumentPicker from "expo-document-picker";
import { AuthContext } from "../Context/auth-context";
import { useCreateDocumentMutation, useGetDocumentsQuery } from "../state/documentApi";

export default function FileQuery({}) {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const { data: documents, isLoading: loading, isError: error, refetch } = useGetDocumentsQuery(token);
  const [createDocumentMutation, { isLoading: isCreating }] = useCreateDocumentMutation();

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
    screenContent = <FlatList data={documents} renderItem={({ item }) => <FileDisplay item={item} />} keyExtractor={(item) => item.id} />;
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

      const fileName = docRes.assets[0].name.split(".")[0];
      const isDocumentExists = documents.find((document) => document.file_name === fileName);
	  
      if (documents.length > 0 && isDocumentExists) {
        Alert.alert("Error", "You already have a document with the same name!");
        return;
      } else {
        Alert.alert("Confirmation", `Do you want to upload ${docRes.assets[0].name}?`, [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              const formData = new FormData();
              formData.append("file", {
                uri: docRes.assets[0].uri,
                name: docRes.assets[0].name,
                type: docRes.assets[0].mimeType,
              });
              createDocumentMutation({ token, formData });
              refetch();
            },
            style: "default",
          },
        ]);
      }
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
            <Button disabled={isCreating} loading={isCreating} buttonName='Add New Document' onPress={pickFile} />
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
    marginBottom: vs(5),
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
