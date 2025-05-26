import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext,useEffect } from "react";
import { StatusBar,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import { Provider } from "react-redux";
import { colors } from "./src/constants/colors";
import AuthContextProvider,{ AuthContext } from "./src/Context/auth-context";
import BrowseChatScreen from "./src/Screens/BrowseChatScreen";
import BrowseScreen from "./src/Screens/BrowseScreen";
import ChatScreen from "./src/Screens/ChatScreen";
import FileQuery from "./src/Screens/FileQuery";
import FunctionalitySelectionScreen from "./src/Screens/FunctionalitySelectionScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import SQLQueryScreen from "./src/Screens/SQLQueryScreen";
import { store } from "./src/store";
import { checkTokenValidity } from "./src/Utils/general/tokenUtility";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function AutheticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerTintColor: colors.textColor,
        contentStyle: {
          backgroundColor: colors.backgroundColor,
          paddingHorizontal: s(10),
        },
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='FunctionalitySelection'
        component={FunctionalitySelectionScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "All Files",
        }}
        name='FileQuery'
        component={FileQuery}
      />
      <Stack.Screen
        options={{
          headerTitle: "Query SQL",
        }}
        name='SQLQuery'
        component={SQLQueryScreen}
      />
      <Stack.Screen name='Chat' component={ChatScreen} />
      <Stack.Screen
        name='Browse'
        component={BrowseScreen}
        options={{ headerTitle: "Chat With Websites" }}
      />
      <Stack.Screen
        name='BrowseChat'
        component={BrowseChatScreen}
        options={{ headerTitle: "Chat With Websites" }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.backgroundColor,
        },
      }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  const authStatus =
    authContext.isAuthenticated && checkTokenValidity(authContext.token);

  return (
    <NavigationContainer>
      {!authStatus && <AuthStack />}
      {authStatus && <AutheticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [loaded, error] = Font.useFonts({
    Montserrat: require("./assets/fonts/montserrat.ttf"),
    Lato: require("./assets/fonts/lato.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <AuthContextProvider>
          <StatusBar style='light' />
          <Navigation />
        </AuthContextProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
