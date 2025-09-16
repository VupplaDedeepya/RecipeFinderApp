import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../navigation/types/navigationTypes';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/userStore';
import { toggleFavorite } from '../redux/reducers/FavoriteSlice';

type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;
type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export default function SearchScreen() {
  const route = useRoute<SearchScreenRouteProp>();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const { query } = route.params;

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes by search query
  useEffect(() => {
    const fetchRecipesByIngredient = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByIngredient();
  }, [query]);

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const renderItem = ({ item }: { item: any }) => {
    const isFavorite = favorites.includes(item.idMeal);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Recipe', { id: item.idMeal })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.image}
          onError={(error) =>
            console.log('Image Load Error:', item.strMealThumb, error.nativeEvent)
          }
        />
        <View style={styles.cardFooter}>
          <Text style={styles.title}>{item.strMeal}</Text>
          <TouchableOpacity onPress={() => handleToggleFavorite(item.idMeal)}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? 'red' : 'gray'}
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
        <Text>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipes with "{query}"</Text>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          numColumns={2} // Two columns like HomeScreen
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noResults}>No recipes found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heading: { fontSize: 18, fontWeight: 'bold', margin: 10, marginTop: 40 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
  listContainer: { padding: 10 },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: { width: '100%', height: 120, resizeMode: 'cover', backgroundColor: '#eee' },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
  },
  title: { fontSize: 14, fontWeight: 'bold', flex: 1 },
});
