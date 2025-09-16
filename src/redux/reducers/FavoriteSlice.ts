// src/redux/reducers/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favorites: string[]; // store recipe IDs (idMeal)
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((fav) => fav !== id);
      } else {
        state.favorites.push(id);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
