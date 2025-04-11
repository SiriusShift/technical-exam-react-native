import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { currencySymbol } from "@/utils/currencySymbol";
import { Button } from "react-native-paper";

export default function Product() {
  const item = useSelector((state) => state.product?.info);
  const currency = useSelector((state) => state.settings?.currency);
  const { id } = useLocalSearchParams();

  const variant = item?.variants?.find((v) => v.id === id);
  const price = variant?.prices?.find(
    (p) => p?.currency_code?.toUpperCase() === currency?.toUpperCase()
  );

  if (!item || !variant) {
    return (
      <View style={styles.centered}>
        <Text>Product or variant not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.rowBetween}>
            <Text style={styles.name}>
              {item.title} - {variant.title}
            </Text>
            <Text style={styles.price}>
              {price
                ? `${
                    currencySymbol[
                      price.currency_code.toUpperCase() as keyof typeof currencySymbol
                    ] || ""
                  } ${price.amount}`
                : "Price N/A"}
            </Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
      <Button mode="contained" style={styles.pledge}>
        Pledge
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: 20,
  },
  thumbnail: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#444",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  pledge: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
