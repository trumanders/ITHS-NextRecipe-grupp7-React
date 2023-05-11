import {useState} from 'react'
import { 
    getPopularRecipes, 
    filterRecipes,
    getRecipeSearch,
    getRandomRecipes, 
    getRecipeByIngredients,
    getAllRecipes,
} from '../../../utils'
import Search from '../../components/Searchbar/Search'
import RecipeRepresentation from '../../components/RecipeRepresentation/RecipeRepresentation'
import { useSearchStringStore } from '../../hooks/useSearchStringStore'
import { useClickStore } from '../../hooks/useClickStore'
import { useLoaderData } from 'react-router-dom'

//Laddar populära recept innan rendering
export async function loader() {
  const popularRecipes = await getPopularRecipes()
  return {popularRecipes}
}

export default function Home() {
  const searchString = useSearchStringStore((state) => state.searchString)
  const {popularRecipes} = useLoaderData()
  const [isClicked, setIsClicked] = useClickStore(
    (state) => [state.isClicked, state.setIsClicked])
  const [prevClick, setPrevClick] = useState(0)
  const [title, setTitle] = useState("Popular Recipes")
  const [recipes, setRecipes] = useState(popularRecipes)
  const [hasResults, setHasResults] = useState(true)

  //När man trycker på ""search" kollar den vilken tab man gör det i och hämtar recept utifrån det.
  if(isClicked > prevClick) {
    // setHasResults(true)
    switch (searchString.call) {
      case "getIngredient":
        const fetchIngredient = async() => {
          //Om inga val är gjorda i 'advanced search' behöver inte två endpoints anropas.

          if (searchString.ingredients==="" && searchString.type === "" && searchString.intolerances === "" && searchString.diet === ""){
            const response = await getAllRecipes();
            setHasResults(true)
            setRecipes(response)
            setTitle(`All Recipes`)
          } else if (searchString.type === "" && searchString.intolerances === "" && searchString.diet === "") {
              const response = await getRecipeByIngredients(searchString.ingredients)
              if (response.length <1) {
                setHasResults(false)
              } else { 
              setHasResults(true)
              setRecipes(response)
              setTitle(`Found ${response.length} recipes with ${searchString.ingredients}`)
              }
          } else {
              const response = await filterRecipes(searchString.ingredients, searchString.type, searchString.intolerances, searchString.diet)
              if (response.length <1) {
                setHasResults(false)
              } else { 
              setHasResults(true)
              setRecipes(response)
              setTitle(`Found ${response.length} recipes with ${searchString.ingredients}`)
              }
          }
          }
        fetchIngredient()
        break
      case "getRecipeSearch":
        const fetchFreeSearch = async() => {
          const response = await getRecipeSearch(searchString.ingredients)
          const allRecipes = await getAllRecipes()
          if (response.length < 1) {
            setHasResults(false)
            setRecipes([])
            setTitle(`Recipes with ${searchString.ingredients}`)
          } else {
              setHasResults(true)
              setRecipes(response)
              setTitle(`Found ${response.length} recipes with ${searchString.ingredients}`)
              }
        }
        fetchFreeSearch()
        break
      case "getRandom":
        const fetchRandom = async() => {
          const response = await getRandomRecipes(searchString.ingredients)
          if (response.length < 1) {
            setHasResults(false)
          } else {
            setHasResults(true)
          setRecipes(response)
          setTitle("Random Recipes")
          }
        }
        fetchRandom()
        break
    }

    setPrevClick(prevClick + 1)
  } 

  return(
  <>
  <Search />
  {!hasResults &&
  <div className="noResult">
  <h3>Sorry, no results found.</h3>
  <RecipeRepresentation recipes={popularRecipes} title='Popular Recipes' />
  </div>}
  {recipes.length > 0 && hasResults &&
  <RecipeRepresentation recipes={recipes} title={title} />}
  </>
  )
}