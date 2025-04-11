import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

export default function Index() {
  const router = useRouter();
  const { userToken, isLoading } = useAuth();
  useEffect(() => {
    const handleNavigation = async () => {
      if (isLoading) return;

      await SplashScreen.hideAsync();

      if (userToken) {
        router.replace("/(auth)/(tabs)");
      } else {
        router.replace("/sign-in");
      }
    };

    handleNavigation();
  }, [userToken, isLoading]);

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
