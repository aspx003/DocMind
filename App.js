import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import IconButton from "./src/Components/IconButton";
import { colors } from "./src/constants/colors";
import AuthContextProvider, { AuthContext } from "./src/Context/auth-context";
import ChatScreen from "./src/Screens/ChatScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import { store } from "./src/store";
import { s } from "react-native-size-matters";
import FileQuery from "./src/Screens/FileQuery";
import FunctionalitySelectionScreen from "./src/Screens/FunctionalitySelectionScreen";
import SQLQueryScreen from "./src/Screens/SQLQueryScreen";

const Stack = createNativeStackNavigator();

function AutheticatedStack() {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerTintColor: colors.textColor,
        contentStyle: {
          backgroundColor: colors.backgroundColor,
          paddingHorizontal: s(20),
        },
      }}>
      <Stack.Screen
        options={{
          headerShown: false
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
  },
});
