import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASEURL,

    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set(
        "Authorization",
        `Bearer ${SecureStore.getItem("accessToken")}`
      );
      headers.set(
        `x-publishable-api-key`,
        `${process.env.EXPO_PUBLIC_PUBLISHABLE_KEY}`
      );
      return headers;
    },
    fetchFn: async (url, options) => {
      console.log("Making request to:", url);
      console.log("Request options:", options);
      return fetch(url, options);
    },
  }),
  endpoints: () => ({}),
});
