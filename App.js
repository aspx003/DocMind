import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { StyleSheet,View } from "react-native";
import { ms,mvs } from "react-native-size-matters";
import { Provider } from "react-redux";
import IconButton from "./src/Components/IconButton";
import AuthContextProvider,{ AuthContext } from "./src/Context/auth-context";
import ChatScreen from "./src/Screens/ChatScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import MainAppScreen from "./src/Screens/MainAppScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import { store } from "./src/store";

const Stack = createNativeStackNavigator();

function AutheticatedStack() {

	const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen options={{
		headerTitle: "All Files",
		headerRight: () => {
			return <IconButton name={'logout'} size={24} onPress={authContext.logout} />
		}
	  }} name='MainApp' component={MainAppScreen} />
	  <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {

	const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <AutheticatedStack />}
    </NavigationContainer>
  );
}

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
      <Provider store={store}>
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
      </Provider>
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
