const key = "ce78851c6bc24bf4944626cc0c04848e";
// getPopularRecipes()

//getRecipeByFilter('dinner', '', 'vegetarian')

//filterRecipes('beef,tomato', 'dinner', 'gluten', 'paleo')

// getRecipeSearch("Carbonara")

//  getRandomRecipes("vegetarian, gluten, dinner")
// getSimilarRecipes(615761)

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
    let fetchResults = []

    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&tags=${tags}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': `${key}`
        }
    })
    
    var data = await response.json()

    console.log(data)
    
    return data.recipes
}

export async function getRecipeSearch(searchString) {
    let fetchResults = []

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchString}&number=10`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': `${key}`
        }
    })
    var data = await response.json()

    data.results.forEach(item => {
        fetchResults.push(
            item
        )
    })

    console.log(fetchResults)
    return fetchResults
}

export async function getPopularRecipes() {
  let fetchResults = [];

  const response = await fetch(
    "https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=8",
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

      let ingredientGetIds = ingredientGet.map((element) => {
        //Plockar ut id för enklare filtrering
        return element.id;
      });

      var intersect = filterGet.filter((item) =>
        ingredientGetIds.includes(item.id)
      ); //plockar ut de objekt som finns i båda resultaten

      intersect.forEach((item) => {
        searchResults.push(item);
      });

      skip += 100; //100 adderas till hur många vi ska hoppa över i nästa hämtning

      if (filterGet.length < 100 || skip > 4900) {
        //Om filterGet är mindre än 100 har resultaten tagit slut hos API:et
        break;
      }
    } while (searchResults.length < 10);
    console.log(searchResults.length);
    return searchResults;
  } else {
    const filterGet = await getRecipeByFilter(
      mealtype,
      intolerances,
      diet,
      skip
    ); //Om det inte finns några ingredienser i input hämtas endast denna.

    return filterGet;
  }
}

export async function getRecipeById(id) {
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
    return item.id
  })

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
