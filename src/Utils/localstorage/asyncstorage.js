import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  try {
	const value = await AsyncStorage.getItem(key);
	if (value !== null) {
	  return value;
	}
  } catch (e) {
	console.log(e);
  }
};

const removeData = async (key) => {
  try {
	await AsyncStorage.removeItem(key);
  } catch (e) {
	console.log(e);
  }
};

export { storeData, getData, removeData };