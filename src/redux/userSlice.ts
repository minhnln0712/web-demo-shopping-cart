import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface UserStateValue {
  roleId: string;
  userName: string;
  phoneNumber: string;
  address: string;
  isAuthenticated: boolean;
  token: string;
}

interface UserState {
  value: UserStateValue;
}

const initialState = {
  value: {
    roleId: "",
    userName: "",
    phoneNumber: "",
    address: "",
    isAuthenticated: false,
    token: "",
  },
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<UserStateValue>) => {
      state.value = action.payload;
    },
    logout: (state: UserState) => {
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = userSlice.actions;
