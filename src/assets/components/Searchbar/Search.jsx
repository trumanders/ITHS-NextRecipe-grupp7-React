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
import { useIngredientStore } from "../../hooks/useIngredientStore";
import { 
  useMealTypeStore,
  useDietStore, 
  useIntoleranceStore, 
} from "../../hooks/useFilterStore";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

function Search({ isLoading }) {
  const [input, setInput] = useState("");
  const [ingredients, updateIngredients] = useIngredientStore((state) => [
    state.ingredients,
    state.updateIngredients,
  ]);
  const [mealType, updateMealType] = useMealTypeStore((state) => [
    state.mealType,
    state.updateMealType,
  ]);
  const [diet, updateDiet] = useDietStore((state) => [
    state.diet,
    state.updateDiet,
  ]);
  const [intolerance, updateIntolerance] = useIntoleranceStore((state) => [
    state.intolerance,
    state.updateIntolerance,
  ]);
  const [listInputs, setlistInputs] = useState(ingredients);
  const [recipeSearch, setrecipeSearch] = useState("");
  const [listDiet, setlistDiet] = useState(diet);
  const [listType, setlistType] = useState(mealType);
  const [listIntolerances, setlistIntolerances] = useState(intolerance);
  const [searchString, setSearchString] = useSearchStringStore(
    (state) => [state.searchString, state.setSearchString],
    shallow
  );
  const setIsClicked = useClickStore(
    (state) => state.setIsClicked, 
    shallow);
  const [alertMsgRecipe, setAlertMsgRecipe] = useState("");
  const [alertMsgIngredient, setAlertMsgIngredient] = useState("");
  const [isMobile, setMobile] = useState(window.innerWidth < 730);
  const [emptyTextWarning, setEmptyTextWarning] = useState(false);

  const updateMedia = () => {
    setMobile(window.innerWidth < 730);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isMobile]);

  // Funktion för addera ingredienser till lista med felhantering mot dubbla inputs
  const handleSubmit = (event) => {
    event.preventDefault();
    const item = input.toLowerCase();

    if (listInputs.includes(item)) {
      setAlertMsgIngredient("Ingredient already added.");
      // setInput("");
      return;
    }
    if (input) {
      setlistInputs((ls) => [...ls, item]);
      setInput("");
      setAlertMsgIngredient(" ");
      setEmptyTextWarning(false);
    } else {
      setEmptyTextWarning(true);
    }
  };

  useEffect(() => {
    updateIngredients(listInputs);
  }, [listInputs]);
  useEffect(() => {
    updateMealType(listType);
  }, [listType]);
  useEffect(() => {
    updateDiet(listDiet);
  }, [listDiet]);
  useEffect(() => {
    updateIntolerance(listIntolerances);
  }, [listIntolerances]);

  // Funktion för att ta bort ingredienserna från listan.
  const deleteInput = (value) => {
    setlistInputs((oldValues) => {
      return oldValues.filter((item) => item !== value);
    });
  };

  // Gör om värden till strängar, som sedan kan skickas till searchStore och som sedan kanbehandlas i URL:en. Även felhantering om det ej finns ingredienser från input.
  const sendIngredients = () => {
    setSearchString({
      ingredients: listInputs.toString(),
      type: listType.toString(),
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
      setEmptyTextWarning(true);
      return;
    } else {
      setEmptyTextWarning(false);
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

  function onTabClick() {
    setEmptyTextWarning(false);
    setAlertMsgIngredient(false);
  }

  return (
    <div className="searchpadding">
      <Tabs
        id="searchtabs"
        className="justify-content-center"
        onClick={setNull}
      >
        <Tab
          eventKey="take-what-you-have"
          title="Take what you have"
          onExit={onTabClick}
        >
          <p className="textpadding">
            Here you will find recipes based on what ingredients you have at
            home.
          </p>

          <form onSubmit={handleSubmit} className="search-form">
            <div className="searchbar">
              <input
                type="text"
                placeholder="Add your ingredients"
                value={input}
                name="tab1"
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
                    {item !== "" ? (
                      <span>
                        {item} {"  "}
                      </span>
                    ) : null}
                    <CloseButton
                      type="Button"
                      onClick={() => deleteInput(item)}
                    ></CloseButton>
                  </li>
                );
              })}
            </ul>
            <div className="search-btn-container">
              <div className="search-btn">
                <button
                  type="button"
                  className="searchButton"
                  disabled={isLoading} onClick={sendIngredients}
                >
                  <b>Search</b>
                </button>
              
                <div className={isLoading ? "spinner" : "noLoader"}>
                  <LoaderSpinner wrapperClass="search-spinner" height="30" width="30" />
                </div>
              </div>
            </div>

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
        <Tab eventKey="home" title="Recipes" onExit={onTabClick}>
          <p className="textpadding">Search recipes</p>

          <form onSubmit={sendRecipe} className="search-form">
            <div className="searchbar">
              <input
                className={emptyTextWarning ? "search-text-alert" : null}
                type="text"
                placeholder="Enter something..."
                value={recipeSearch}
                name="tab2"
                onChange={(event) => setrecipeSearch(event.target.value)}
              />
            </div>
            <div className="search-btn-container">
            <div className="search-btn">
              <button className="searchButton" disabled={isLoading} onClick={sendRecipe}>
                <b>Search</b>
              </button>
              <div className={isLoading ? "spinner" : "noLoader"}>
              <LoaderSpinner wrapperClass="search-spinner" height="30" width="30" />
              </div>
            </div>
          </div>
          </form>
        </Tab>

        <Tab eventKey="contact" title="Random recipe" onExit={onTabClick}>
          <p className="textpadding">
            Use our randomizer when you have a hard time coming up with ideas.
          </p>
          <div className="search-btn-container">
            <div className="search-btn">
              <button className="searchButton" onClick={sendRandom}>
                <b>Go!</b>
              </button>
              <div className={isLoading ? "spinner" : "noLoader"}>
              <LoaderSpinner wrapperClass="search-spinner" height="30" width="30" />
              </div>
            </div>
          </div>
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
