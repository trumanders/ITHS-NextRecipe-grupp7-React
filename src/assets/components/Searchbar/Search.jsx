import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useEffect, useState } from "react";
import "./Search.css";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import { useClickStore } from "../../hooks/useClickStore";
import { useSearchStringStore } from "../../hooks/useSearchStringStore";
import { shallow } from "zustand/shallow";
import CustomAccordion from "./Accordion";

function Search() {
  const [input, setInput] = useState("");

  const [searchString, setSearchString] = useSearchStringStore(
    (state) => [state.searchString, state.setSearchString],
    shallow
  );

  const [listInputs, setlistInputs] = useState(
    convertToArray(searchString.ingredients)
  );
  const [recipeSearch, setrecipeSearch] = useState("");
  const [listDiet, setlistDiet] = useState([]);
  const [listType, setlistType] = useState("");
  const [listIntolerances, setlistIntolerances] = useState([]);

  const [isClicked, setIsClicked] = useClickStore(
    (state) => [state.isClicked, state.setIsClicked],
    shallow
  );
  const [alertMsgRecipe, setAlertMsgRecipe] = useState("");
  const [alertMsgIngredient, setAlertMsgIngredient] = useState("");
  const [isMobile, setMobile] = useState(window.innerWidth < 730);

  const updateMedia = () => {
    setMobile(window.innerWidth < 730);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isMobile]);

  // Gör om searchString till en array. Om arrayen innehåller en tom sträng, returnera en tom array.
  function convertToArray(str) {
    const ingredientArr = str.split(",").map((item) => item);
    return ingredientArr.length === 1 && ingredientArr[0] === ""
      ? []
      : ingredientArr;
  }

  // Funktion för addera ingridienser till lista med felhantering mot dubbla inputs
  const handleSubmit = (event) => {
    event.preventDefault();
    const item = input;

    if (listInputs.includes(item)) {
      setAlertMsgIngredient("Ingredient already added.");
      setInput("");
      return;
    }
    if (input) {
      setlistInputs((ls) => [...ls, item]);
      setInput("");
      setAlertMsgIngredient("");
    } else {
      setAlertMsgIngredient("No ingredient added");
    }
  };

  // Funktion för att ta bort ingridienserna från listan.
  const deleteInput = (value) => {
    setlistInputs((oldValues) => {
      return oldValues.filter((item) => item !== value);
    });
  };

  // Funktion för att ta emot flera värden från checkboxar, om checkad läggs värdet till i listan, om inte så tas värdet bort.
  //  const handleDietbox =(event) =>{

  //    const{value, checked} = event.target

  //    if(checked)
  //    {
  //     setlistDiet(diets => [...diets,value])
  //    }
  //    else(
  //     setlistDiet(diets => {
  //       return [...diets.filter(dietValue => dietValue !== value)]
  //     })
  //    )

  //   }
  // Funktion för att ta emot flera värden från checkboxar, om checkad läggs värdet till i listan, om inte så tas värdet bort.
  // const handleIntolerances =(event) => {
  //   const{value, checked} = event.target

  //  if(checked)
  //  {
  //   setlistIntolerances(intolerances => [...intolerances,value])
  //  }
  //  else(
  //   setlistIntolerances(diets => {
  //     return [...diets.filter(intolerances => intolerances !== value)]
  //   })
  //  )

  // }

  // Gör om värden till strängar, som sedan kan skickas till searchStore och som sedan kanbehandlas i URL:en. Även felhantering om det ej finns ingridenser från input.
  const sendIngridients = () => {
    setSearchString({
      ingredients: listInputs.toString(),
      type: listType,
      intolerances: listIntolerances.toString(),
      diet: listDiet.toString(),
      call: "getIngredient",
    });
    setIsClicked();
  };

  // Gör om värden till strängar, som sedan kan skickas till searchStore och som sedan kan behandlas i URL:en. Om sökinput ej finns, så får man felmeddelande
  const sendRecipe = (event) => {
    event.preventDefault();
    const recipeItem = recipeSearch;
    setrecipeSearch(recipeItem);
    if (recipeSearch === "") {
      setAlertMsgRecipe("Please type something to search for.");
      return;
    }
    setSearchString({ ingredients: recipeSearch, call: "getRecipeSearch" });
    setIsClicked();
    setAlertMsgRecipe("");
    setrecipeSearch("");
  };

  // Gör om värden till strängar, som sedan kan skickas till searchStore och som sedan kan behandlas i URL:en.
  const sendRandom = () => {
    const valuesRandom = [listDiet, listType, listIntolerances].toString();
    setSearchString({ ingredients: valuesRandom, call: "getRandom" });
    setIsClicked();
  };

  const setNull = () => {
    setlistDiet([]);
    setlistType("");
    setlistIntolerances([]);
  };

  return (
    <div className="searchpadding">
      <Tabs
        id="searchtabs"
        className="justify-content-center"
        onClick={setNull}
      >
        <Tab eventKey="take-what-you-have" title="Take what you have">
          <p className="textpadding">
            Here you will find recipes based on what ingridients you have at
            home.
          </p>

          <form onSubmit={handleSubmit} className="search-form">
            <div
              className="searchbar"
              style={
                alertMsgIngredient !== ""
                  ? { padding: 0 }
                  : { paddingBottom: 23 }
              }
            >
              <input
                type="text"
                placeholder="Add your ingridients"
                value={input}
                name="tab1"
                className={
                  alertMsgIngredient !== ""
                    ? "search-text-alert"
                    : "search-text"
                }
                onChange={(event) => setInput(event.target.value)}
              />
              <Button
                className="addBtn"
                variant="dark"
                type="button"
                onClick={handleSubmit}
              >
                Add
              </Button>
              <div className="alertOutput">{alertMsgIngredient}</div>
            </div>

            <ul id="itemContainer">
              {listInputs.map((item) => {
                return (
                  <li className="searchItem" key={item}>
                    <span>
                      {item} {"  "}
                    </span>
                    <CloseButton
                      type="Button"
                      onClick={() => deleteInput(item)}
                    ></CloseButton>
                  </li>
                );
              })}
            </ul>

            <Button onClick={sendIngridients} variant="outline-dark">
              Search
            </Button>
            <CustomAccordion
              listType={listType}
              setlistType={setlistType}
              listDiet={listDiet}
              setlistDiet={setlistDiet}
              listIntolerances={listIntolerances}
              setlistIntolerances={setlistIntolerances}
            />
          </form>
        </Tab>
        <Tab eventKey="home" title="Recipes">
          <p className="textpadding">Search recipes</p>

          <form onSubmit={sendRecipe} className="search">
            <div
              className="searchbar"
              style={
                alertMsgRecipe !== "" ? { padding: 0 } : { paddingBottom: 23 }
              }
            >
              <input
                type="text"
                placeholder="Recipe"
                value={recipeSearch}
                name="tab2"
                className={
                  alertMsgRecipe !== "" ? "search-text-alert" : "search-text"
                }
                onChange={(event) => setrecipeSearch(event.target.value)}
              />
              <div className="alertOutput">{alertMsgRecipe}</div>
            </div>
            <Button variant="outline-dark" type="Button" onClick={sendRecipe}>
              Search
            </Button>
          </form>
        </Tab>

        <Tab eventKey="contact" title="Random recipe">
          <p className="textpadding">
            Use our randomizer when you have a hard time coming up with ideas.
          </p>

          <Button variant="outline-dark" onClick={sendRandom} type="Button">
            Go!
          </Button>

          <CustomAccordion
            listType={listType}
            setlistType={setlistType}
            listDiet={listDiet}
            setlistDiet={setlistDiet}
            listIntolerances={listIntolerances}
            setlistIntolerances={setlistIntolerances}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Search;
