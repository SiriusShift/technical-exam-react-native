import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function TabsLayouts() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="product"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
