import nails from './assets/pictures/nails.jpeg'

const key = "fab9f1e7670c48479e11b994a1023259";
getRecipeById(143564)

//#region helperfunctions
function intersect(arr1, arr2) {
  const arr1Ids = arr1.map((element) => {
    return element.id;
  });
  return arr2.filter((item) => arr1Ids.includes(item.id));
}

export function listenForOutsideClicks(
  listening,
  setListening,
  menuRef,
  setIsAccordionVisible,
) {
  return () => {
    if (listening) return
    if (!menuRef.current) return
    setListening(true)
    ;[`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef.current
        const node = evt.target
        if (cur === null || cur.contains(node)) return
        setIsAccordionVisible(false)
      })
    })
  }
}
//#endregion
//#region API-calls
export async function getAllRecipes() {
  let allRecipes = [];
  let number = 100; //antal som ska hämtas
  let skip = 0; //antal som ska hoppas över
  let totalNumber = 0;

  do {
    try {
      const url = `https://api.spoonacular.com/recipes/complexSearch?number=${number}&offset=${skip}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${key}`,
        },
      });

      var data = await response.json();

      data.results.forEach((item) => {
        allRecipes.push(item);
      });
    } catch (e) {
      console.log(e);
    }

    totalNumber = data.totalResults;
    skip = allRecipes.length;
    console.log(allRecipes.length);
    number = totalNumber - skip >= 100 ? 100 : totalNumber - skip;
  } while (allRecipes.length < 200); //hämtar 200 recept. För samtliga recept - (allRecipes.length < totalNumber)

  return allRecipes;
}

export async function getRandomRecipes(tags) {
  let url =
    tags !== ",,"
      ? `https://api.spoonacular.com/recipes/random?number=100&tags=${tags}`
      : `https://api.spoonacular.com/recipes/random?number=100`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": `${key}`,
    },
  });

  var data = await response.json();

  return data.recipes;
}

export async function getRecipeSearch(searchString) {
  let fetchResults = [];

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${searchString}&number=100`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${key}`,
      },
    }
  );
  var data = await response.json();

  data.results.forEach((item) => {
    fetchResults.push(item);
  });

  // console.log(fetchResults);
  return fetchResults;
}

export async function getPopularRecipes() {
  let fetchResults = [];

  const response = await fetch(
    "https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=100",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${key}`,
      },
    }
  );
  var data = await response.json();

  data.results.forEach((item) => {
    fetchResults.push(item);
  });

  // console.log(fetchResults)
  return fetchResults;
}

export async function getRecipeByIngredients(ingredients) {
  //--------- Trams -----------
  if(ingredients === "nails" || ingredients === "nail") return nailSoup

  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=100`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${key}`,
      },
    }
  );

  const data = await response.json();
  
  return data;
}

export async function getRecipeByFilter(mealtype, intolerances, diet, skip) {
  let allRecipes = [];
  let number = 100; //antal som ska hämtas

  try {
    const url = `https://api.spoonacular.com/recipes/complexSearch?type=${mealtype}&diet=${diet}&intolerances=${intolerances}&number=${number}&offset=${skip}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${key}`,
      },
    });

    var data = await response.json();

    data.results.forEach((item) => {
      allRecipes.push(item);
    });
  } catch (e) {
    console.log(e);
  }

  return allRecipes;
}


export async function filterRecipes(ingredients, mealtype, intolerances, diet) {
  var searchResults = []; //Där resultaten sen ska hamna
  var skip = 0;

  //--------- Trams ------------
  if(ingredients === "nails" || ingredients === "nail") return nailSoup

  //Om inga ingredienser är ifyllda görs inget anrop till den endpointen
  const ingredientGet =
    ingredients === "" ? false : await getRecipeByIngredients(ingredients);
  // console.log(`ingredientGet: ${ingredientGet.length}`)
  if (ingredientGet != false) {
    do {
      let filterGet = await getRecipeByFilter(
        mealtype,
        intolerances,
        diet,
        skip
      );
      console.log(`filterGet: ${filterGet.length} skip: ${skip}`);

      //Jämför de två resultat-seten och plockar ut de som finns med i båda.
      var intersectingRecipes = intersect(ingredientGet, filterGet);

      intersectingRecipes.forEach((item) => {
        searchResults.push(item);
      });

      skip += 100; //100 adderas till hur många vi ska hoppa över i nästa hämtning
        //Om filterGet är mindre än 100 har resultaten tagit slut hos API:et
      if (filterGet.length < 100 || skip > 4900) break;
    } while (searchResults.length < 20); //Kan inte vara 100. Vid enbart ingrediens och inga filter kommer den försöka tömma API:et vilket leder till 429.
    // console.log(searchResults.length);
    const matchingIngredients = intersect(searchResults, ingredientGet)
    // console.log(matchingIngredients)
    return matchingIngredients !== null ? matchingIngredients : searchResults;
  } else { //Om det inte finns några ingredienser i input hämtas endast denna.
    const filterGet = await getRecipeByFilter(
      mealtype,
      intolerances,
      diet,
      skip
    ); 

    return filterGet;
  }
}

export async function getRecipeById(id) {
  //----------- Trams -----------
  if(id === "1312") return nailSoupInfo

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${key}`,
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function getSimilarRecipes(id) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/similar?number=3`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${key}`,
      },
    }
  );

  const data = await response.json();

  //Eftersom similarRecipes inte levereras med bild plockas id:n ut från similar-resultaten och hela recepten hämtas.
  const ids = data.map((item) => {
    return item.id;
  });

  const responseTwo = await fetch(
    `https://api.spoonacular.com/recipes/informationBulk?ids=${ids.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${key}`,
      },
    }
  );

  const dataTwo = await responseTwo.json();

  return dataTwo;
}
//#endregion

const nailSoup = [{
  id: 1312,
  title: 'Nail Soup',
  image: nails,
  imageType: 'jpeg',
  usedIngredientCount: 1,
  missedIngredientCount: 0,
  missedIngredients: [],
  usedIngredients: [ {
    id: 13121,
    amount: 1,
    unit: 'piece',
    unitLong: 'piece',
    unitShort: 'pcs',
    aisle: 'Hardware',
    name: 'nail',
    original: '1 nail, preferably rusty',
    originalName: 'nail, rusty',
    meta: [ 'rust' ],
    image: 'https://spoonacular.com/cdn/ingredients_100x100/spring-onions.jpg'
  } ],
  unusedIngredients: [],
  likes: 0
}]

const nailSoupInfo = {
  vegetarian: true,
  vegan: true,
  glutenFree: true,
  dairyFree: true,
  veryHealthy: false,
  cheap: true,
  veryPopular: false,
  sustainable: true,
  lowFodmap: true,
  weightWatcherSmartPoints: 1,
  gaps: 'no',
  preparationMinutes: 25,
  cookingMinutes: 10,
  aggregateLikes: 65,
  healthScore: 4,
  creditsText: 'Cajsa Warg',
  sourceName: 'Cajsa Warg',
  pricePerServing: .02,
  extendedIngredients: [
    {
      id: 13121,
      aisle: 'Hardware',
      image: 'nail.jpg',
      consistency: 'SOLID',
      name: 'nail',
      nameClean: 'nail',
      original: 'Nail',
      originalName: 'Nail',
      amount: 1,
      unit: 'piece',
      meta: [],
      measures: []
    }
  ],
  id: 1312,
  title: 'Nail Soup',
  readyInMinutes: 35,
  servings: 4,
  sourceUrl: 'http://www.amuse-your-bouche.com/macaroni-cheese-fritters',
  image: nails,
  imageType: 'jpeg',
  summary: ``,
  cuisines: [],
  nutrition: {
    nutrients: [{
    name: 'Calories',
    amount: 476.33,
    unit: 'kcal',
    percentOfDailyNeeds: 23.82
  },
  { name: 'Fat', amount: 17.47, unit: 'g', percentOfDailyNeeds: 26.88 },
  {
    name: 'Saturated Fat',
    amount: 3.98,
    unit: 'g',
    percentOfDailyNeeds: 24.88
  },
  {
    name: 'Carbohydrates',
    amount: 5.12,
    unit: 'g',
    percentOfDailyNeeds: 1.71
  },
  {
    name: 'Net Carbohydrates',
    amount: 4.88,
    unit: 'g',
    percentOfDailyNeeds: 1.78
  },
  { name: 'Sugar', amount: 3.45, unit: 'g', percentOfDailyNeeds: 3.83 },
  {
    name: 'Cholesterol',
    amount: 322.05,
    unit: 'mg',
    percentOfDailyNeeds: 107.35
  },
  {
    name: 'Sodium',
    amount: 1383.9,
    unit: 'mg',
    percentOfDailyNeeds: 60.17
  },
  {
    name: 'Alcohol',
    amount: 2.06,
    unit: 'g',
    percentOfDailyNeeds: 11.44
  },
  {
    name: 'Protein',
    amount: 67.45,
    unit: 'g',
    percentOfDailyNeeds: 134.9
  },
  {
    name: 'Selenium',
    amount: 77.04,
    unit: 'µg',
    percentOfDailyNeeds: 110.06
  },
  {
    name: 'Vitamin B3',
    amount: 19.74,
    unit: 'mg',
    percentOfDailyNeeds: 98.69
  },
  {
    name: 'Vitamin B6',
    amount: 1.58,
    unit: 'mg',
    percentOfDailyNeeds: 78.89
  },
  {
    name: 'Phosphorus',
    amount: 665.33,
    unit: 'mg',
    percentOfDailyNeeds: 66.53
  },
  {
    name: 'Vitamin B5',
    amount: 4.16,
    unit: 'mg',
    percentOfDailyNeeds: 41.63
  },
  {
    name: 'Vitamin B2',
    amount: 0.63,
    unit: 'mg',
    percentOfDailyNeeds: 37.33
  },
  {
    name: 'Vitamin B12',
    amount: 2.17,
    unit: 'µg',
    percentOfDailyNeeds: 36.16
  },
  { name: 'Zinc', amount: 5.29, unit: 'mg', percentOfDailyNeeds: 35.24 },
  {
    name: 'Potassium',
    amount: 896.79,
    unit: 'mg',
    percentOfDailyNeeds: 25.62
  },
  {
    name: 'Magnesium',
    amount: 88.62,
    unit: 'mg',
    percentOfDailyNeeds: 22.16
  },
  {
    name: 'Vitamin B1',
    amount: 0.32,
    unit: 'mg',
    percentOfDailyNeeds: 21.41
  },
  { name: 'Iron', amount: 500.45, unit: 'mg', percentOfDailyNeeds: 728.15 },
  {
    name: 'Vitamin K',
    amount: 14.19,
    unit: 'µg',
    percentOfDailyNeeds: 13.51
  },
  {
    name: 'Copper',
    amount: 0.22,
    unit: 'mg',
    percentOfDailyNeeds: 11.19
  },
  {
    name: 'Manganese',
    amount: 0.21,
    unit: 'mg',
    percentOfDailyNeeds: 10.55
  },
  {
    name: 'Vitamin E',
    amount: 1.12,
    unit: 'mg',
    percentOfDailyNeeds: 7.5
  },
  {
    name: 'Folate',
    amount: 17.66,
    unit: 'µg',
    percentOfDailyNeeds: 4.41
  },
  {
    name: 'Calcium',
    amount: 43.78,
    unit: 'mg',
    percentOfDailyNeeds: 4.38
  },
  {
    name: 'Vitamin A',
    amount: 86.25,
    unit: 'IU',
    percentOfDailyNeeds: 1.72
  }]},
  dishTypes: [ 'side dish', 'lunch', 'main course', 'main dish', 'dinner' ],
  diets: [],
  occasions: [],
  winePairing: {
    pairedWines: [],
    pairingText: 'No one wine will suit every nail soup. Try brännvin instead',
    productMatches: []
  },
  instructions: "Boil water, and then add the nail. Meanwhile stirring, ask the old woman if she wouldn´t like her soup to taste even better. With just a pinch of herbs and some onion and garlic. Cook over a medium-low heat for a few minutes, then tell the old woman that the soup tastes fantastic. But wouldn´t it be great if it could be even better? With just a few potatoes and carrots, that could be done. Now, the soup is truely amazing. Parhaps... parhaps could we make this wonderful nail soup something that people would talk about for generations? All we need is one of your chickens...",
  analyzedInstructions: [ { name: '', steps: [] } ],
  originalId: null
}