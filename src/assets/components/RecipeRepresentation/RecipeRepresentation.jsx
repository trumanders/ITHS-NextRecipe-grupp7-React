import React, { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getPopularRecipes } from "../../../utils";
import Pagination from "../Pagination/pagination";

export default function RecipeRepresentation(props) {
  const [currentPage, setCurrentPage] = useState(1);
  // const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.recipes]);

  //Using Slice method to cut out one specific part of the recipes array which comes in as a prop from the parent component (Home)
  // To use Slice method we need a starting point and a finishing point (The index of the first recipe in each page and the last one)
  // I start by finding the index of the last recipe by multiplying the value of the currentPage into the value of the recipesPerPage
  // Then I calculate the index of the first recipe per page by subtracting recipesPerPage from the indexOfLastRecipeInCurrentPage 
  const recipesPerPage = 8;
  const indexOfLastRecipeInCurrentPage = currentPage * recipesPerPage;
  const indexOfFirstRecipeInCurrentPage = indexOfLastRecipeInCurrentPage - recipesPerPage;
  const currentRecipes = props.recipes.slice(indexOfFirstRecipeInCurrentPage, indexOfLastRecipeInCurrentPage);   

  // The handleOnPageChange function is responsible for updating the current page state when the page changes in the pagination component. (The function is passed to the Pagination component as a callback to be executed when the page changes.)
  function handleOnPageChange(page){
    setCurrentPage(page);
  }
  return (
    <>
      <h1>{props.title}</h1>
      <div className="recipeRepresentation">
        {currentRecipes.map((recipe) => (
          <RecipeCard {...recipe} key={recipe.id} />
        ))}
      </div>
      <div className="pagination">
        <Pagination recipesPerPage={recipesPerPage}
        totalRecipes={props.recipes.length}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}></Pagination>
      </div>
    </>
  );
}
