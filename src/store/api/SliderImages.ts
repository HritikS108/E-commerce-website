import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SliderData } from "../../TypeDefinations/types";
interface Result {
  total: number;
  results: { urls: { raw: string } }[];
}
const SliderImages = createApi({
  reducerPath: "sliderImages",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.unsplash.com/search/photos",
  }),
  endpoints(builder) {
    return {
      fetchImages: builder.query<SliderData, string>({
        query: (category) => {
          return {
            url: "/",
            headers: {
              Authorization:
                "Client-ID tVyT5iFLB3qmTQYHB1UImyIzEfR2eG0bFKce-Ky5FhA",
            },
            params: { query: category },
          };
        },
        transformResponse(response: Result) {
          const res = {
            total: response.total,
            results: response.results.map((item) => item.urls.raw),
          };
          return res;
        },
      }),
    };
  },
});
export const { useFetchImagesQuery } = SliderImages;
export { SliderImages };
