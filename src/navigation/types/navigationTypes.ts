export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strInstructions?: string;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Recipe: { recipe: any }; // Replace `any` with your recipe type later
  Search: { query: string };
  surprise : { id: string };
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined; // 👈 new
};
