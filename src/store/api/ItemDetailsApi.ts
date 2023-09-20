import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../API_KEYS";
import { ItemDetails } from "../../TypeDefinations/types";
interface Result {
  product: {
    name: string;
    description: string;
    whitePrice: {
      price: number;
    };
  };
}
const ItemDetailsApi = createApi({
  reducerPath: "item-details",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail",
  }),
  endpoints(builder) {
    return {
      fetchItemDetails: builder.query<ItemDetails, string>({
        query: (code) => {
          return {
            url: "/",
            params: { lang: "en", country: "us", productcode: code },
            headers: headers,
          };
        },
        transformResponse: (response: Result) => {
          const res: ItemDetails = {
            name: response.product.name,
            description: response.product.description,
            price: response.product.whitePrice.price,
          };
          return res;
        },
      }),
    };
  },
});
export const { useFetchItemDetailsQuery } = ItemDetailsApi;
export { ItemDetailsApi };
