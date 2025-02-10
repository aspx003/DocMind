import axios from "axios";

const API_URL = "http://10.0.2.2:8000";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: email,
        password: password,
        scope: "",
        client_id: "string",
        client_secret: "string",
      }).toString(),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const register = async (username, email, password) => {
	try {
		const response = await fetch(`${API_URL}/api/register`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify({
			username,
			email,
			password
		  })
		});
	
		const data = await response.json();
		return data;
	  } catch (error) {
		console.log("error", error);
	  }
};
