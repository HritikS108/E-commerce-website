import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../TypeDefinations/types";
const initialState: Item[] = [];
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Item>) {
      // Complete item
      const arg = action.payload;
      const temp = state
        .filter((item) => {
          return item.productCode !== arg.productCode;
        })
        .map((item) => {
          return { ...item, quantity: 1 };
        });
      temp.push({ ...arg, quantity: 1 });
      return temp;
    },
    modifyElement(
      state,
      action: PayloadAction<{ code: number; quantity: number }>
    ) {
      // Item code,quantity
      const { code, quantity } = action.payload;
      const temp = state.map((item) => {
        if (item.productCode === code) {
          if (quantity > 0) return { ...item, quantity };
        }
        return item;
      });
      return temp;
    },
    removeElement(state, action: PayloadAction<number>) {
      return state.filter((item) => item.productCode !== action.payload);
    },
  },
});
export const { addToCart, modifyElement, removeElement } = CartSlice.actions;
export const cartReducer = CartSlice.reducer;
