import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/userStore";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { toggleFavorite } from "../redux/reducers/FavoriteSlice";

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      setLoading(true);
      try {
        const fetched: any[] = [];
        for (let id of favorites) {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          if (response.data.meals) {
            fetched.push(response.data.meals[0]);
          }
        }
        setRecipes(fetched);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteRecipes();
    } else {
      setRecipes([]);
      setLoading(false);
    }
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const renderItem = ({ item }: { item: any }) => {
    const isFavorite = favorites.includes(item.idMeal);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Recipe", { id: item.idMeal })}
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <View style={styles.cardFooter}>
          <Text style={styles.title}>{item.strMeal}</Text>
          <TouchableOpacity onPress={() => handleToggleFavorite(item.idMeal)}>
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2575fc" />
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="heart-outline" size={60} color="#ccc" />
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>MY FAVORITES ❤️</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerText: {
    fontWeight: "bold",
    marginTop: 50,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    backgroundColor: "#eee",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
});
