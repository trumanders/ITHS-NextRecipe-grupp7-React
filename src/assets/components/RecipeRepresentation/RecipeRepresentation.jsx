import React, {useState, useEffect} from 'react'
import RecipeCard from "../RecipeCard/RecipeCard";
import { getPopularRecipes } from '../../../utils';

export default function RecipeRepresentation(){
    const [recipes, setRecipes]= useState([]);

    useEffect(()=> { 
    async function fetchData(){
        const response= await getPopularRecipes();
        setRecipes(response)
    }
    fetchData();
    },[])

    return(
    <><h1>Popular Recipes</h1>
    <div className='recipeRepresentation'>
    {recipes.map(popularRecipe=> 
    <RecipeCard {...popularRecipe} key={popularRecipe.id}/>)}
    </div>
    </>)
}