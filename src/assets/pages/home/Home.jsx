import {useState, useEffect} from 'react'
import { 
    getPopularRecipes, 
    filterRecipes,
    getRecipeSearch,
    getRandomRecipes, 
    getRecipeByIngredients,
} from '../../../utils'
import Search from '../../components/Searchbar/Search'
import RecipeRepresentation from '../../components/RecipeRepresentation/RecipeRepresentation'
import { useSearchStringStore } from '../../hooks/useSearchStringStore'
import { useSearchResultStore } from '../../hooks/useSearchResultStore'
import { useClickStore } from '../../hooks/useClickStore'
import { useLoaderData } from 'react-router-dom'

//Laddar populära recept innan rendering
// export async function loader() {
//   const popularRecipes = await getPopularRecipes()
//   return {popularRecipes}
// }

export default function Home() {
  const searchString = useSearchStringStore((state) => state.searchString)
  // const {popularRecipes} = useLoaderData()
  const [isClicked, prevClick, setPrevClick] = useClickStore(
    (state) => [state.isClicked, state.prevClick, state.setPrevClick])
  // const [title, setTitle] = useState("Popular Recipes")
  // const [recipes, setRecipes] = useState([])
  const [hasResults, setHasResults] = useState(true)
  const [searchResult, searchTitle, setSearchResult, setSearchTitle] = useSearchResultStore(
    (state) => [state.searchResult, state.searchTitle, state.setSearchResult, state.setSearchTitle]
  );

    useEffect(() => {
      const fetchData = async() => {
        //Only fetches popular recipes when searchResult is empty to prevent re-fetching
        if(searchResult.length <= 0){
          const response = await getPopularRecipes()
          setSearchResult(response)
        }
      }
      fetchData()
    },[])

    useEffect(() => {
      if(isClicked > prevClick){
      searchPressed()}
    },[isClicked])

  //När man trycker på ""search" kollar den vilken tab man gör det i och hämtar recept utifrån det.
    const searchPressed = () => {
      switch (searchString.call) {
        case "getIngredient":
          const fetchIngredient = async() => {
            //Om inga val är gjorda i 'advanced search' behöver inte två endpoints anropas.
            const response = searchString.type === "" && searchString.intolerances === "" && searchString.diet === "" ? 
            await getRecipeByIngredients(searchString.ingredients) : 
            await filterRecipes(searchString.ingredients, searchString.type, searchString.intolerances, searchString.diet)

            if (response.length < 1) {
              setHasResults(false)
            } else {
              setHasResults(true)
              setSearchResult(response)
              searchString.ingredients !== "" ? setSearchTitle(`Found ${response.length} recipes with ${searchString.ingredients}`) : setSearchTitle(`Found ${response.length} recipes without ingredient search`)
            }
          }
          fetchIngredient()
          break
        case "getRecipeSearch":
          const fetchFreeSearch = async() => {
            const response = await getRecipeSearch(searchString.ingredients)
            if (response.length < 1) {
              setHasResults(false)
              setSearchResult([])
            } else {
              setHasResults(true)
              setSearchResult(response)
              setSearchTitle(`Recipes with ${searchString.ingredients}`)
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
              setSearchResult(response)
              setSearchTitle("Random Recipes")
            }
          }
          fetchRandom()
          break
      }
      setPrevClick()
  }

  return(
  <>
  <Search />
  {!hasResults &&
  <div className="noResult">
  <h3>Sorry, no results found.</h3>
  </div>}
  {searchResult !== undefined && searchResult.length > 0 && 
  <RecipeRepresentation recipes={searchResult} title={searchTitle} />}
  </>
  )
}