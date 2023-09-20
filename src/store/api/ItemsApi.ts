import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../API_KEYS";
import { Item } from "../../TypeDefinations/types";
interface Result {
  results: {
    images: { url: string }[];
    price: { value: number };
    quantity: number;
    articles: { code: number }[];
    code: number;
  }[];
}
const ItemsApi = createApi({
  reducerPath: "items",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
  }),
  endpoints(builder) {
    return {
      fetchItems: builder.query<Item[], { categories: string; page: number }>({
        query: ({ categories, page }) => {
          return {
            url: "/",
            params: {
              country: "in",
              lang: "en",
              currentpage: page,
              pagesize: "30",
              categories: categories,
            },
            headers: headers,
          };
        },
        transformResponse: (response: Result) => {
          const res: Item[] = response.results.map((item) => {
            let x: Item = {
              url: item.images[0].url,
              code: item.code,
              productCode: item.articles[0].code,
              price: item.price.value,
            };
            return x;
          });
          return res;
        },
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        merge: (currentCache, response) => {
          return [...currentCache, ...response];
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
    };
  },
});
export const { useFetchItemsQuery } = ItemsApi;
export { ItemsApi };
