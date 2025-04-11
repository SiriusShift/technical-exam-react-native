import { api } from "@/features/api";

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/customer/emailpass",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = loginApi;
