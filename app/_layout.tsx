import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./store";

export default function _layout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(public)/sign-in" />
            <Stack.Screen name="(public)/sign-up" />
            <Stack.Screen name="(auth)/(tabs)" />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
