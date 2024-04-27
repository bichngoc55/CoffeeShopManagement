import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: null,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...item, quantity });
      }

      state.cartTotalQuantity += quantity;
      state.cartTotalAmount += item.price * quantity;
    },
    removeFromCart: (state, action) => {
      const { item, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        if (existingItem.quantity > quantity) {
          existingItem.quantity -= quantity;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== item.id
          );
        }

        state.cartTotalQuantity -= quantity;
        state.cartTotalAmount -= item.price * quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
