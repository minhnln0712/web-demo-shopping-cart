import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Cấu hình type của value trong UserState
interface CartStateValue {
  cartId: number;
  productId: string;
  quantity: number;
}

// Cấu hình value của UserState
interface CartState {
  listCart: CartStateValue[];
}

// Value gốc của UserState
const initialState = {
  listCart: [],
} as CartState;

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartStateValue>) => {
      const newCart = {
        cartId: action.payload.cartId,
        productId: action.payload.productId,
        quantity: action.payload.quantity,
      };
      state.listCart = [...state.listCart, newCart];
    },
    updateACart: (state: CartState, action: PayloadAction<CartStateValue>) => {
      state.listCart.map((cart) => {
        if (cart.productId === action.payload.productId) {
          cart.quantity = action.payload.quantity;
        }
        return cart;
      });
    },
    removeACart: (state: CartState, action: PayloadAction<CartStateValue>) => {
      state.listCart.map((cart) => cart.productId !== action.payload.productId);
    },
    removeAllCart: (state: CartState) => {
      state.listCart = initialState.listCart;
    },
  },
});

//Những function đã dc tạo để quản lý state...
export const { addToCart, updateACart, removeACart, removeAllCart } =
  cartSlice.actions;
