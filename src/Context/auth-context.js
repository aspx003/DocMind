import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkTokenValidity } from "../Utils/general/tokenUtility";

export const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: (token) => {},
	logout: () => {}
})

function AuthContextProvider({children}) {

	const [authToken, setAuthToken] = useState();

	useEffect(() => {
		async function fetchTokenFromLocalStorage() {
			const storedToken = await AsyncStorage.getItem('token');

			if(storedToken && checkTokenValidity(storedToken)) {
				setAuthToken(storedToken);
			}
		}

		fetchTokenFromLocalStorage();
	}, [])

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem('token', token);
	}

	function logout() {
		setAuthToken(null);
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> 
}

export default AuthContextProvider;
