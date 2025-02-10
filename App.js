import { StyleSheet, View } from "react-native";
import RootNavigator from "./src/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { mvs, ms } from "react-native-size-matters";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function App() {
//   const [loaded, error] = useFonts({
//     "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
//   });

//   useEffect(() => {
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);

//   if (!loaded && !error) {
//     return null;
//   }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
    paddingVertical: mvs(25),
  },
});
