import React, { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getPopularRecipes } from "../../../utils";
import { func } from "prop-types";
import Pagination from "../Pagination/Pagination";


export default function RecipeRepresentation() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await getPopularRecipes();
      setRecipes(response);
    }
    fetchData();
  }, []);

  //Using Slice method to cut out one specific part of the recipes array which comes in as state
  // To use Slice method we need a starting point and a finishing point (The index of the first recipe in each page and the last one)
  // I start by finding the index of the last recipe by multiplying the value of the currentPage into the value of the recipesPerPage
  // Then I calculate theh index of the first recipe per page by subtracting recipesPerPage from the indexOfLastRecipeInCurrentPage 
  const recipesPerPage = 8;
  const indexOfLastRecipeInCurrentPage = currentPage * recipesPerPage;
  const indexOfFirstRecipeInCurrentPage = indexOfLastRecipeInCurrentPage - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipeInCurrentPage, indexOfLastRecipeInCurrentPage);   

  // seting the current state by using this function and passing in the page as prop
  function handleOnPageChange(page){
    setCurrentPage(page);
  }


  // mapping through the sliced array (currentRecipes)
  // rendering Pagination and sending the necessary props to Pagination component
  return (
    <>
      <h1>Popular Recipes</h1>
      <div className="recipeRepresentation">
        {currentRecipes.map((popularRecipe) => (
          <RecipeCard {...popularRecipe} key={popularRecipe.id} />
        ))}
      </div>
      <div className="pagination">
        <Pagination recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}></Pagination>
      </div>
    </>
  );
}
