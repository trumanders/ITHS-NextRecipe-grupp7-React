import { useState, useEffect } from "react";
import {
  getPopularRecipes,
  filterRecipes,
  getRecipeSearch,
  getRandomRecipes,
  getRecipeByIngredients,
  getAllRecipes,
} from "../../../utils";
import Search from "../../components/Searchbar/Search";
import RecipeRepresentation from "../../components/RecipeRepresentation/RecipeRepresentation";
import { useSearchStringStore } from "../../hooks/useSearchStringStore";
import { useSearchResultStore } from "../../hooks/useSearchResultStore";
import { useClickStore } from "../../hooks/useClickStore";
import { useLoaderData } from "react-router-dom";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import AdCarousel from "../../components/Advertisement/Ad";
import './Home.css'

//Laddar populära recept innan rendering
// export async function loader() {
//   const popularRecipes = await getPopularRecipes()
//   return {popularRecipes}
// }

export default function Home() {
  const searchString = useSearchStringStore((state) => state.searchString);
  // const {popularRecipes} = useLoaderData()
  const [isClicked, prevClick, setPrevClick] = useClickStore((state) => [
    state.isClicked,
    state.prevClick,
    state.setPrevClick,
  ]);
  // const [title, setTitle] = useState("Popular Recipes")
  // const [recipes, setRecipes] = useState([])
  const [hasResults, setHasResults] = useState(true);
  const [
    searchResult,
    searchTitle,
    setSearchResult,
    setSearchTitle,
    setSearchIngredients,
  ] = useSearchResultStore((state) => [
    state.searchResult,
    state.searchTitle,
    state.setSearchResult,
    state.setSearchTitle,
    state.setSearchIngredients,
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      //Only fetches popular recipes when searchResult is empty to prevent re-fetching
      if (searchResult.length <= 0) {
        setIsLoading(true);
        const response = await getPopularRecipes();
        setSearchResult(response);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isClicked > prevClick) {
      searchPressed();
    }
  }, [isClicked]);

  //plockar ut idn på ingredienserna och lägger dem i searchResultStore för att kunna användas i Recipe.jsx
  const getIngredients = (recipes) => {
    const ingredients = recipes.map((recipe) => recipe.usedIngredients);
    const ingredientIds = ingredients.map((array) =>
      array.map((ingredient) => {
        return ingredient.id;
      })
    );
    var ids = [];
    ingredientIds.forEach((arr) => arr.map((item) => ids.push(item)));
    const unique = [...new Set(ids)];
    setSearchIngredients(unique);
  };

  const handleResponse = (response, title, ingredients  = false) => {
    setHasResults(true);
    setSearchResult(response);
    setSearchTitle(title);
    ingredients ? getIngredients(response) : setSearchIngredients([]);
    setIsLoading(false);

  }
  const handleEmptyResponse = () => {
    setHasResults(false);
    setIsLoading(false);
  }

  //När man trycker på ""search" kollar den vilken tab man gör det i och hämtar recept utifrån det.
  const searchPressed = () => {
    setIsLoading(true);
    const { ingredients, type, intolerances, diet, call } = searchString;
    switch (call) {
      case "getIngredient":
        const fetchIngredient = async () => {
          //Om inga val är gjorda i 'advanced search' behöver inte två endpoints anropas.
          if (
            ingredients === "" &&
            type === "" &&
            intolerances === "" &&
            diet === ""
          ) {
            const response = await getAllRecipes();
            handleResponse(response, "All Recipes");
          } else if (
            type === "" &&
            intolerances === "" &&
            diet === ""
          ) {
            const response = await getRecipeByIngredients(ingredients);
            response.length < 1 ? handleEmptyResponse() : 
              handleResponse(response, `Found ${response.length === 100 ? "100+" : response.length} recipes`, true);
          } else {
            const response = await filterRecipes(ingredients,type,intolerances,diet);
            response.length < 1 ? handleEmptyResponse() : 
              handleResponse(response, `Found ${response.length === 100 ? "100+" : response.length} recipes`, (ingredients !== "")) //Om man inte skrivit i ingredienser sköts val av endpoint i filterRecipes() men getIngredients behöver ändå rätt info.
          }
        };
        fetchIngredient();
        break;
      case "getRecipeSearch":
        const fetchFreeSearch = async () => {
          const response = await getRecipeSearch(ingredients);
          response.length < 1 ? handleEmptyResponse() : 
            handleResponse(response, `Found ${response.length === 100 ? "100+" : response.length} recipes`);
        };
        fetchFreeSearch();
        break;
      case "getRandom":
        const fetchRandom = async () => {
          const response = await getRandomRecipes(ingredients);
          response.length < 1 ? handleEmptyResponse() : 
            handleResponse(response, "Random Recipes");
        };
        fetchRandom();
        break;
    }
    setPrevClick(prevClick + 1);
  };

  return (
    <div className="home">
      <div className={isLoading ? "loader" : "noLoader"}>
        <LoaderSpinner />
      </div>
      <Search />
      <AdCarousel />
      
      {!hasResults && (
        <div className="noResult">
          <h3>Sorry, no results found.</h3>
        </div>
      )}
      {searchResult !== undefined && searchResult.length > 0 && (
        <RecipeRepresentation recipes={searchResult} title={searchTitle} />
      )}
    </div>
  );
}
