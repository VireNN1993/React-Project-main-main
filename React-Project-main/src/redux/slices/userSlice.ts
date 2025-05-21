// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/User";

export type UserState = {
  isLoggedIn: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  userData: UserType | null;
};

const initialState: UserState = {
  isLoggedIn: false,
  isBusiness: false,
  isAdmin: false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.isBusiness = action.payload.isBusiness;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser(state) {
      state.userData = null;
      state.isLoggedIn = false;
      state.isBusiness = false;
      state.isAdmin = false;
    },
    // פעולה חדשה לעדכון נתוני משתמש
    updateUser(state, action: PayloadAction<UserType>) {
      state.userData = action.payload;
      state.isBusiness = action.payload.isBusiness;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
