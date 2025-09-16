import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import { MainTabParamList } from "./types/navigationTypes";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Favorites") iconName = "heart-outline";
          else iconName = "person-outline"; 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> 
    </Tab.Navigator>
  );
}
