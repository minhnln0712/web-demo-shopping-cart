import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Cấu hình type của value trong UserState
interface UserStateValue {
  userId: string;
  roleId: string;
  userName: string;
  phoneNumber: string;
  isAuthenticated: boolean;
  token: string;
}

// Cấu hình value của UserState
interface UserState {
  value: UserStateValue;
}

// Value gốc của UserState
const initialState = {
  value: {
    userId: "",
    roleId: "",
    userName: "",
    phoneNumber: "",
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

//Những function đã dc tạo để quản lý state...
export const { login, logout } = userSlice.actions;
