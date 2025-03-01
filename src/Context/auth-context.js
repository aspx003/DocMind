import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkTokenValidity } from "../Utils/general/tokenUtility";

export const AuthContext = createContext({
	token: '',
	username: null,
	isAuthenticated: false,
	authenticate: (token, username) => {},
	logout: () => {}
})

function AuthContextProvider({children}) {

	const [authToken, setAuthToken] = useState();
	const [username, setUsername] = useState();

	useEffect(() => {
		async function fetchTokenFromLocalStorage() {
			const storedToken = await AsyncStorage.getItem('token');
			const storedUsername = await AsyncStorage.getItem('username');
			if(storedUsername) {
				setUsername(storedUsername);
			}

			if(storedToken && checkTokenValidity(storedToken)) {
				setAuthToken(storedToken);
			}
		}
		fetchTokenFromLocalStorage();															
	}, [])

	function authenticate(token, username) {
		setAuthToken(token);
		setUsername(username);
		AsyncStorage.setItem('token', token);
		AsyncStorage.setItem('username', username);
	}

	function logout() {
		setAuthToken(null);
		setUsername(null);
		AsyncStorage.removeItem('token');
		AsyncStorage.removeItem('username');
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
		username: username
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> 
}

export default AuthContextProvider;
