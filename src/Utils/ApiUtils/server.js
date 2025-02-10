import axios from "axios";

const API_URL = "http://10.0.2.2:8000";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/login`,
      new URLSearchParams({
        grant_type: "password",
        username: email,
        password: password,
        scope: "",
        client_id: "string",
        client_secret: "string",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
	return null;
  }
};
