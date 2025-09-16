import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  fullName: string; // optional
  email: string;
  password: string;
}


interface UserState {
  users: User[];
  token: string | null;
  loggedInUser: User | null;
}

const initialState: UserState = {
  users: [],
  token: null,
  loggedInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action: PayloadAction<{email:string;password:string}>) => {
      const existingUser = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );

      if (existingUser) {
        state.token = Math.random().toString(36).substring(2); 
        state.loggedInUser = existingUser;
      } else {
        state.token = null;
        state.loggedInUser = null;
      }
    },
    logoutUser: (state) => {
      state.token = null;
      state.loggedInUser = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
