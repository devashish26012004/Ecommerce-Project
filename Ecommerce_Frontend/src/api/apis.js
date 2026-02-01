import axios from "axios";
let backendBaseUrl = "http://localhost:8080";

const checkServer = async () => {
  try {
    const response = await axios.get(backendBaseUrl);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const login = async (loginData) => {
  try {
    const res = await axios.post(`${backendBaseUrl}/api/auth/login`, loginData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (registerData) => {
  try {
    const res = await axios.post(
      `${backendBaseUrl}/api/auth/register`,
      registerData,
    );
    return res.data;
  } catch (error) {
    console.error("Register API error:", error.response?.data || error.message);
    throw error;
  }
};

export { checkServer, login, register };
