import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../TypeDefinations/types";
const initialState: Item[] = [];
const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Item>) {
      const temp = state.filter((item) => item.code !== action.payload.code);
      temp.push(action.payload);
      return temp;
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      return state.filter((item) => item.code != action.payload);
    },
  },
});
export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;
export const wishlistReducer = WishlistSlice.reducer;
