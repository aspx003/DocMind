import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { s, ms, vs } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function FileDisplay({ item }) {
  const navigation = useNavigation();

  function navigateToChat() {
    navigation.navigate('Chat', {
      documentId: item.id,
      fileName: item.file_name,
    });
  }

  let icon = null;
  let color = null;

  switch (item.file_type) {
    case 'pdf':
      icon = 'file-pdf';
      color = 'red';
      break;
    case 'csv':
      icon = 'file-csv';
      color = 'blue';
      break;
    case 'txt':
      icon = 'file-text';
      color = 'white';
      break;
    case 'xlsx':
      icon = 'file-excel';
      color = 'green';
      break;
    default:
      break;
  }

  return (
    <Pressable onPress={navigateToChat} style={styles.container}>
      <View style={styles.extContainer}>
        <FontAwesome6 name={icon} size={24} color={color} />
      </View>
      <View style={styles.fileNameContainer}>
        <Text style={styles.textStyle}>{item.file_name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: ms(10),
    minHeight: vs(50),
    marginBottom: vs(15),
    backgroundColor: colors.documentCardColor,
    elevation: 5,
  },
  extContainer: {
    width: s(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    paddingHorizontal: s(10),
  },
  textStyle: {
    color: colors.textColor,
    fontFamily: 'Lato',
  },
  imageStyle: {
    height: vs(28),
    width: s(28),
  },
});
