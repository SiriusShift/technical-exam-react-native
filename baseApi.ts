import axios from "axios";
import * as SecureStore from "expo-secure-store";

console.log(process.env.EXPO_PUBLIC_BASEURL);
export const api = axios.create({
  baseURL: "http://localhost:9000", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor to add token dynamically
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken"); // Async get token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
