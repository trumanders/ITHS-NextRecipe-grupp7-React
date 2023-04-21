import {useState,useEffect} from 'react'
import { 
    getPopularRecipes, 
    filterRecipes, 
} from '../../utils'
import Search from '../components/Searchbar/Search'
import RecipeRepresentation from '../components/RecipeRepresentation/RecipeRepresentation'
import { useSearchStringStore } from '../hooks/useSearchStringStore'
import { useClickStore } from '../hooks/useClickStore'


export default function Home() {
  const [recipes, setRecipes] = useState([])
  const searchString = useSearchStringStore((state) => state.searchString)
  //const {popularRecipes} = useLoaderData()
  const [isClicked, setIsClicked] = useClickStore(
    (state) => [state.isClicked, state.setIsClicked])
  const [prevClick, setPrevClick] = useState(0)

  //----Ersätts av useLoaderData när routingen är på plats.
  useEffect(() => {
    async function fetchData() {
      const response = await getPopularRecipes();
      setRecipes(response);
    }
    fetchData();
  }, []);
  //------

  if(isClicked > prevClick) {
    const fetchData = async() => {
      const response = await filterRecipes(searchString.ingredients, searchString.type, searchString.intolerances, searchString.diet)
      setRecipes(response)
    }
    fetchData()
    setPrevClick(prevClick + 1)
  }

//   if(recipes.length === 0) {
//     setRecipes(popularRecipes)
//   }

  return(
  <>
  <Search />
  {recipes.length > 0 && 
  <RecipeRepresentation recipes={recipes} />}
  </>
  )
}