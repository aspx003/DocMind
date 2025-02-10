import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import MainAppScreen from "./Screens/MainAppScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useSelector((state) => state.auth);

  let shownScreen = null;

  if (user._j && isTokenExpired(user._j.access_token)) {
    shownScreen = <Stack.Screen name='MainApp' component={MainAppScreen} />;
  } else {
    shownScreen = (
      <>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
		{shownScreen}
	</Stack.Navigator>
  );
}
