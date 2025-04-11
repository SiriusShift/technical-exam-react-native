import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { currencySymbol } from "@/utils/currencySymbol";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/features/products/reducer/productsSlice";
import { useRouter } from "expo-router";

type pressProps = {
  item: Object;
  variant: string;
};
const Index = () => {
  const currency = useSelector((state) => state.currency);
  const { data } = useGetProductsQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(data);

  const handlePress = ({ item, variant }: pressProps) => {
    dispatch(setProduct(item));
    router.push({
      pathname: `/(auth)/(tabs)/product`,
      params: { id: variant },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.products?.map((item) =>
        item?.variants?.map((variant) => {
          const price = variant?.prices?.[0];
          return (
            <TouchableOpacity
              onPress={() => handlePress({ item, variant: variant?.id })}
              key={`${item.id}-${variant.id}`} // ✅ unique key
              style={styles.card} // ✅ apply card styles to TouchableOpacity
              activeOpacity={0.8} // optional: for visual feedback
            >
              <Image
                source={{ uri: item?.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.name}>
                  {item.title} - {variant?.title}
                </Text>
                {price ? (
                  <Text style={styles.price}>
                    {currencySymbol[
                      price?.currency_code?.toUpperCase() as keyof typeof currencySymbol
                    ] || ""}{" "}
                    {price?.amount}
                  </Text>
                ) : (
                  <Text style={styles.price}>Price unavailable</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  card: {
    width: 150,
    backgroundColor: "#888",
    borderRadius: 10,
    paddingBottom: 8, // added for balanced spacing
    marginBottom: 16,
    shadowColor: "#000", // required for shadow on iOS
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // added for Android shadow
  },

  thumbnail: {
    width: "100%",
    height: 100,
    marginBottom: 8,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  name: {
    fontWeight: "bold",
    fontSize: 11,
    marginBottom: 4,
  },
  price: {
    fontSize: 10,
    color: "yellow",
  },
});
