import React, { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getPopularRecipes } from "../../../utils";

export default function RecipeRepresentation(props) {
  // const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getPopularRecipes();
  //     setRecipes(response);
  //   }
  //   fetchData();
  // }, []);

  return (
    <>
      <h1>{props.title}</h1>
      <div className="recipeRepresentation">
        {props.recipes.map((recipe) => (
          <RecipeCard {...recipe} key={recipe.id} />
        ))}
      </div>
    </>
  );
}
