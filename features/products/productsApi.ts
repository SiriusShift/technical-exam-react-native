import { api } from "@/features/api";

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/store/products",
        method: "GET",
        params,
      }),
    }),
    // getProductById: builder.query({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //     method: "GET",
    //   }),
    // }),
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery } = productsApi;
