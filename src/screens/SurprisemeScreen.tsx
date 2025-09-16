import {View,Text,ActivityIndicator,Image,ScrollView,StyleSheet} from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../navigation/types/navigationTypes";

type SurprisemeScreenRouteProp = RouteProp<RootStackParamList, "surprise">;
export default function Surpriseme(){
    const route = useRoute<SurprisemeScreenRouteProp>();
  const { id } = route.params;

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/random.php`
        );
        setRecipe(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2575fc" />
        <Text>Loading recipe...</Text>
      </View>
    );
  }

  if (!recipe) {
    return <Text style={styles.error}>Recipe not found.</Text>;
  }

  // ✅ Extract ingredients & measures
  const getIngredients = () => {
    let ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ name: ingredient, measure: measure || "" });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <ScrollView style={styles.container}>
      {/* Recipe Image */}
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Text style={styles.category}>
        {recipe.strCategory} | {recipe.strArea}
      </Text>

      {/* Ingredients Section */}
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <View style={styles.ingredientsContainer}>
        {ingredients.map((item, index) => (
          <View key={index} style={styles.ingredientCard}>
            <Image
              source={{
                uri: `https://www.themealdb.com/images/ingredients/${item.name}-Small.png`,
              }}
              style={styles.ingredientImage}
            />
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientMeasure}>{item.measure}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Instructions Section */}
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { flex: 1, textAlign: "center", marginTop: 20 },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5, color: "#222" },
  category: { fontSize: 14, color: "#666", marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },

  // ✅ Ingredient styles
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ingredientCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  ingredientName: { fontSize: 15, fontWeight: "600", color: "#333" },
  ingredientMeasure: { fontSize: 13, color: "#666" },

  instructions: { fontSize: 14, lineHeight: 20, color: "#333", marginBottom: 50 },
});

