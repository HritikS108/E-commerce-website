import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../API_KEYS";
import { Category } from "../../TypeDefinations/types";
const categoryApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  }),
  endpoints(builder) {
    return {
      fetchCategories: builder.query<Category[], void>({
        query: () => {
          return {
            url: "/categories/list",
            params: { lang: "en", country: "us" },
            headers: headers,
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useFetchCategoriesQuery } = categoryApi;
export { categoryApi };
