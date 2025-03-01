import axios from "axios";

const API_URL = "http://10.0.2.2:8000";

async function login(email, password) {
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

    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.log("error", error);
  }
}

async function register(username, email, password) {
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
}

// function to get userProfile
async function getUserProfile(token) {
  try {
    const response = await axios.get(`${API_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.username;
  } catch (error) {
    console.log("error", error);
  }
}

export function loginUser(email, password) {
  return login(email, password);
}

export function registerUser(username, email, password) {
  return register(username, email, password);
}

export function fetchUserProfile(token) {
  return getUserProfile(token);
}
