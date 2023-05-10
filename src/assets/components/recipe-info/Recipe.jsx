import "./Recipe.css";
import "./PictureAndInfo.css";
import "./NutritionTable.css";
import "./Ingredient.css";
import "./Instructions.css";
import "./Steps.css";
import "./BackButton.css"
import { getRecipeById, getSimilarRecipes } from "../../../utils";
import React, { useEffect, useState } from "react";
import { TfiTimer } from "react-icons/tfi";
import { BiDish } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import defaultFood from "../../pictures/defaultFood.jpeg";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import {useNavigate, browserHistory} from 'react-router-dom';

import RecipeCard from "../RecipeCard/RecipeCard";

export async function loader({ params }) {
  const recipe = await getRecipeById(params.recipeId);
  return { recipe };
}

export default function Recipe() {
  const { recipe } = useLoaderData();
  // const [recipe, setRecipe] = useState(null);
  const [similars, setSimilars] = useState();
  const [isMobile, setMobile] = useState(window.innerWidth < 730);
  const [isTablet, setTablet] = useState(
    window.innerWidth < 900
  ); /* Nutrition table går under receptbild och info (gömd under fällbarknapp) */
  const [servings, setServings] = useState(recipe.servings);

  const updateMediaToTablet = () => {
    setTablet(window.innerWidth < 900);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMediaToTablet);
    return () => window.removeEventListener("resize", updateMediaToTablet);
  }, [isTablet]);

  //Denna del av Shakiba
  const updateMedia = () => {
    setMobile(window.innerWidth < 730);
  };

  //Denna del av Shakiba för rerender vid mobil version för show/hide button
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isMobile]);

  //Hämta liknande recept
  useEffect(() => {
    const fetchData = async () => {
      let response = await getSimilarRecipes(recipe.id);
      setSimilars(response);
    };
    fetchData();
    //Scrolla upp till toppen när nya recept laddas, dvs när man klickat på ett av dem.
    window.scrollTo({
      top: 0,
      behaviour: "auto",
    });
  }, [recipe]);

  //Ändrar ingredienserna efter antalet portioner som är valt (mängd ingredienser / portioner * valt antal portioner)
  function changeIngredients(pickedServings) {
    recipe.extendedIngredients.forEach((element) => {
      element.amount = (element.amount / servings) * pickedServings;
    });
    //Renderar om sidan med pickedServings
    recipe.servings = pickedServings;
    setServings(pickedServings);
  }

  const navigate = useNavigate();
  const goBack = () => {
		navigate(browserHistory);
	}

  if (recipe != null && similars != null) {
    return (
      <>
        <Button className="BackButton" onClick={goBack} >Back to Searchresults</Button> 
        <br></br>
        <br></br>
        <h2>{recipe.title}</h2>       
        <div className="recipe-container">
          <div className="picture-pictureInfo-and-nutritionTable-container">
            <div className="recipe-section-pictureAndInfo">
              <PictureAndInfo
                calculate={changeIngredients}
                image={recipe.image}
                cookTime={recipe.readyInMinutes}
                serving={servings}
              />
            </div>
            
            <>
              {/* Kollar om mobile version */}
              {isTablet ? (
                /*Om Mobilversion*/
                <div className="showMorebtn">
                  {/* Sätt en knapp för att visa nutritions*/}
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Nutritions</Accordion.Header>
                      <Accordion.Body>
                        <div className="recipe-section-nutritionTable">
                          <NutritionTable
                            nutritionValues={recipe.nutrition.nutrients.slice(
                              0,
                              9
                            )}
                          />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ) : (
                /* Om inte mobilversion */
                <div className="recipe-section-nutritionTable">
                  <NutritionTable
                    nutritionValues={recipe.nutrition.nutrients.slice(0, 9)}
                  />
                </div>
              )}
            </>
          </div>

          <div className="recipe-section-ingredients">
            {/* Kollar om mobile version */}
            {isMobile ? (
              <div className="showMorebtn">
                {/* Sätt en knapp för att visa nutritions*/}

                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Ingredients</Accordion.Header>
                    <Accordion.Body>
                      <div className="recipe-section-nutritionTable">
                        <Ingredient ingredients={recipe.extendedIngredients} />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ) : (
              /* Om inte mobilversion */
              <Ingredient ingredients={recipe.extendedIngredients} />
            )}
          </div>

          <div className="recipe-section-instructions">
            {/* Kollar om mobile version */}
            {isMobile ? (
              <div className="showMorebtn">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Steps</Accordion.Header>
                    <Accordion.Body>
                      <div className="recipe-section-nutritionTable">
                        <Instructions
                          steps={recipe.instructions}
                          recipeID={recipe.id}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ) : (
              /* Om inte mobilversion */
              <Instructions steps={recipe.instructions} recipeID={recipe.id} />
            )}
          </div>

          <div className="similar-title">
          <h3>Similar recipes</h3>
          </div>
          <div className="similar-recipes">
            {similars.map((rec) => (
              <RecipeCard
                id={rec.id}
                image={rec.image}
                title={rec.title}
                key={rec.id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

//Komponent som håller Bild, antal servings och tid att laga
const PictureAndInfo = (props) => {
  //calculate är propertyn som håller värdet (antalet valda portioner) som sedan ska beräknas i changeIngredients
  const handleChange = (event) => {
    if (event.target.value > 0) props.calculate(event.target.value);
  };
  return (
    <article className="picture-and-info-container">
      <img
        className="recipe-picture"
        src={
          props.image === null || props.image === undefined
            ? defaultFood
            : props.image
        }
        alt="Image of recipe"
      />
      {/*Att styla sen med fontawsome*/}
      <div className="extra-recipe-info">
        <div>
          <b>
            <TfiTimer />
          </b>{" "}
          {"   "}
          <span>
            <b>{props.cookTime}</b>
          </span>
          <span>
            <b>min.</b>
          </span>
        </div>
        <div>
          <b>
            <BiDish />
          </b>{" "}
          {"   "}
          <span>
            <b>{props.serving}</b>
          </span>
          <span>
            <b> people</b>
          </span>
        </div>
        <select onChange={handleChange} name="servings">
          <option value={0}>Change servings</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
        </select>
      </div>
    </article>
  );
};

//Komponent med tabell som håller näringsinnehållet.
const NutritionTable = (props) => {
  return (
    <aside className="nutrition-table-container">
      <table className="nutrition-table">
        <thead key="head">
          <tr key="headrow">
            <th key="Nutritions">Nutritions</th>
            <th key="Amount">Amount</th>
          </tr>
        </thead>

        {props.nutritionValues.map(
          (nutr, index) =>
            nutr.name !== "Net Carbohydrates" && (
              <tbody key={`${index}body`}>
                <tr key={index}>
                  <td>
                    <b>{nutr.name}</b>
                  </td>
                  <td>
                    <b>
                      {nutr.amount} {nutr.unit}
                    </b>
                  </td>
                </tr>
              </tbody>
            )
        )}
      </table>
    </aside>
  );
};

//Komponent som håller ingredienser och mått
const Ingredient = (props) => {
  return (
    <div className="ingredients-container">
      <h2>Ingredients</h2>
      <ul className="list-ingredients">
        {/* list-row" för att kunna arrangera olika information av samma ingrediens med hjälp av flex */}
        {props.ingredients.map((ingredient, index) => (
          <li key={index} className="list-row">
            <div className="ingredient-name">
              <b>{ingredient.nameClean}</b>
            </div>
            <div className="amount-unit">
              <span>
                {convertAmountAndUnit(ingredient.amount, ingredient.unit)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <br></br>
    </div>
  );
};

//Komponent som håller i stegen
const Instructions = (props) => {
  const beautifySteps = () => {
    /* För bättre kontroll av instruktioner */
    let steps = {
      html: props.steps
        .replaceAll(
          /((<p>)|(<\/p>)|(<ol>)|(<ul>)|(<\/ol>)|(<\/ul>)|(<li>)|(<\/li>))/g,
          ""
        )
        .replaceAll(/((\.)(\s))/g, `.`)
        .replaceAll(/(\s\s+)/g, "")
        .replace(/(\.)([A-Z])/g, `$1<br/>$2`)
        .replaceAll(/\r\n|\r|\n/gm, "<br/>"),
    };

    const stepArray = steps.html.split("<br>")[0].split("<br/>");
    return stepArray;
  };

  var steps = null;

  if (props.steps !== null) {
    steps = beautifySteps(); /* Sparar undan instrukstionsstegen som array */
  }

  const checkBoxChange = (instructionElemID) => {
    document
      .getElementById(instructionElemID)
      .classList.toggle("instructionDone");
  };

  return (
    <div className="instructions-container">
      <h2>Steps</h2>
      {props.steps !== null ? (
        <ul className="steps-list">
          {steps.map((instructionRow, index) => (
            <li key={props.recipeID + "_" + index}>
              <label
                htmlFor={props.recipeID + "_" + index}
                className="steps-list-row"
              >
                <input
                  id={props.recipeID + "_" + index}
                  key={props.recipeID + "_" + index}
                  type="checkbox"
                  className="instructionCheckBox"
                  onChange={() =>
                    checkBoxChange(
                      props.recipeID + "_" + index + "_instruction"
                    )
                  }
                />{" "}
                <div
                  id={props.recipeID + "_" + index + "_instruction"}
                  className="instruction"
                >
                  {instructionRow}
                </div>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Sorry, no instructions found for this recipe. Feel free to improvise!
        </p>
      )}
    </div>
  );
};

function convertAmountAndUnit(amount, unit) {
  const cupToTbspFactor = 16;
  const tbspToTspFactor = 3;
  let convAmount = amount;

  if (
    unit === "lb" ||
    unit === "Lb" ||
    unit === "pound" ||
    unit === "Pound" ||
    unit === "lbs" ||
    unit === "Lbs" ||
    unit === "pounds" ||
    unit === "Pounds"
  )
    unit = "lb";

  if (
    unit === "ounce" ||
    unit === "oz" ||
    unit === "Ounce" ||
    unit === "Oz" ||
    unit === "ounces" ||
    unit === "Ounces"
  )
    unit = "oz";

  if (unit === "cup" || unit === "Cup" || unit === "cups" || unit === "Cups")
    unit = "cup";

  if (
    unit === "tsp" ||
    unit === "Tsp" ||
    unit === "tsps" ||
    unit === "Tsps" ||
    unit === "teaspoon" ||
    unit === "teaspoons" ||
    unit === "Teaspoon" ||
    unit === "Teaspoons"
  )
    unit = "tsp";

  if (
    unit === "tbsp" ||
    unit === "Tbsp" ||
    unit === "tbsps" ||
    unit === "Tbsps" ||
    unit === "tablespoon" ||
    unit === "tablespoons" ||
    unit === "Tablespoon" ||
    unit === "Tablsespoons"
  )
    unit = "tbsp";

  if (unit === "cup" && amount < 0.25) {
    convAmount = amount * cupToTbspFactor;
    unit = "tbsp";
  } else if (unit === "lb" && amount < 0.25) {
    convAmount = amount * cupToTbspFactor;
    unit = "oz";
  } else if (unit === "tbsp") {
    if (amount > cupToTbspFactor) {
      convAmount /= cupToTbspFactor;
      unit = "cup";
    }
    if (amount < 0.25) {
      convAmount = amount * tbspToTspFactor;
      unit = "tsp";
    }
  } else if (unit === "tsp") {
    if (amount > tbspToTspFactor) {
      convAmount = amount / tbspToTspFactor;
      unit = "tbsp";
    }
    if (amount > (tbspToTspFactor * cupToTbspFactor) / 2) {
      convAmount = amount / (tbspToTspFactor * cupToTbspFactor);
      unit = "cup";
    }
  }

  if (unit === "tbsp" && convAmount < 0.5) {
    convAmount = convAmount * tbspToTspFactor;
    unit = "tsp";
  }

  // let result = "";
  // convAmount < 2
  //   ? (result = convAmount.toString() + " " + unit)
  //   : (result = convAmount.toString() + " " + unit + "s");
  return nearestFourth(convAmount) + " " + unit;
}

function nearestFourth(num) {
  let nearestFourth = Math.round(num * 4) / 4;
  let whole = Math.floor(nearestFourth);
  let fraction = nearestFourth - whole;
  let result = "";
  if (whole !== 0) result = whole.toString() + " ";
  switch (fraction) {
    case 0.25:
      result += "1/4";
      break;
    case 0.5:
      result += "1/2";
      break;
    case 0.75:
      result += "3/4";
      break;
  }
  return result;
}
