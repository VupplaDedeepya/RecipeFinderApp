import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../redux/store/userStore";
import { RootStackParamList } from "../navigation/types/navigationTypes";
import { toggleFavorite } from "../redux/reducers/FavoriteSlice"; // ✅ import favorites actions

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();

  //  Redux favorites
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from API when screen loads
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigation.navigate("Search", { query });
    }
  };
  const handleSurprise=()=>{
    navigation.navigate("surprise",{id:""});
  }

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
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.image}
          onError={(error) =>
            console.log(
              "Image Load Error:",
              item.strMealThumb,
              error.nativeEvent
            )
          }
        />
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

  return (
    <View style={styles.container}>
      {/* Header with Logo + Text */}
      <View style={styles.headerRow}>
        <Image
          source={require("../assets/logo.png")} 
          style={styles.logo}
        />
        <Text style={styles.headerText}>TastyTrail</Text>
        <TouchableOpacity style={{backgroundColor:'#a3e4e5ff',marginLeft:108,height:42,width:"28%",borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:10}} onPress={handleSurprise}><Text>Surprise Me!</Text></TouchableOpacity>
      </View>

      {/* Search Row */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search for recipe by ingredient..."
          style={styles.txt}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#2575fc" />
          <Text>Loading recipes...</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // ✅ Header Row
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 10,
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },

  searchRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  txt: {
    marginTop: 20,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    fontSize: 15,
    width: "68%",
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: "#a3e4e5ff",
    height: 40,
    width: "28%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
