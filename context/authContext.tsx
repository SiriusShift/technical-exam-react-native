// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { router, useRouter } from "expo-router";

export const AuthContext = createContext({
  isLoading: false,
  userToken: null as string | null,
  // userInfo: null as object | null,
  login: async ({}: String) => {},
  logout: async () => {},
  register: async ({ email, password, name }: registerProps) => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a <AuthProvider />");
  }
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type registerProps = {
  email: string;
  password: string;
};

type loginProps = {
  email: string;
  password: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const router = useRouter();
  // const [userInfo, setUserInfo] = useState<object | null>(null);

  const login = async (token: string) => {
    setIsLoading(true);
    try {
      // Call your API for authentication
      if (token) {
        setUserToken(token);
        // setUserInfo(data.user);

        // Store authentication data securely
        await SecureStore.setItemAsync("userToken", token);
        router.replace("/(auth)/(tabs)");
        // await SecureStore.setItemAsync("userInfo", JSON.stringify(data.user));
      } else {
        // Handle authentication error
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    // setUserInfo(null);
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userInfo");
    setIsLoading(false);
  };

  const register = async (token: string) => {
    setIsLoading(true);
    try {
      if (token) {
        setUserToken(token);
        // setUserInfo(data.user);

        // Store authentication data securely
        await SecureStore.setItemAsync("userToken", token);
        router.replace("/(auth)/(tabs)");
        // await SecureStore.setItemAsync("userInfo", JSON.stringify(data.user));
      } else {
        // Handle authentication error
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const storedToken = await SecureStore.getItemAsync("userToken");
      const storedUser = await SecureStore.getItemAsync("userInfo");

      if (storedToken) {
        setUserToken(storedToken);
        // setUserInfo(storedUser ? JSON.parse(storedUser) : null);
      }

      setIsLoading(false);
    } catch (error) {
      console.log("IsLoggedIn error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        // userInfo,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
