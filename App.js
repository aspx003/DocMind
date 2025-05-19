import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { useContext,useEffect,useState } from "react";
import { StyleSheet,Text,View } from "react-native";
import { s } from "react-native-size-matters";
import { Provider } from "react-redux";
import { colors } from "./src/constants/colors";
import AuthContextProvider,{ AuthContext } from "./src/Context/auth-context";
import BrowseScreen from "./src/Screens/BrowseScreen";
import ChatScreen from "./src/Screens/ChatScreen";
import FileQuery from "./src/Screens/FileQuery";
import FunctionalitySelectionScreen from "./src/Screens/FunctionalitySelectionScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import SQLQueryScreen from "./src/Screens/SQLQueryScreen";
import { store } from "./src/store";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function AutheticatedStack() {
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
	  <Stack.Screen name='Browse' component={BrowseScreen} />
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
	const [loaded, error] = Font.useFonts({
		'Montserrat': require('./assets/fonts/montserrat.ttf'),
		'Lato': require('./assets/fonts/lato.ttf'),
	})

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error])

	if(!loaded && !error) {
		return null;
	}

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
