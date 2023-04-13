Funktionerna i utils.js importeras till den komponent som behöver hämta data från API:et.

För att importera i .jsx-fil:
import {getPopularRecipes} from '../../utils' (beroende på hur relativa sökvägen ser ut från aktuell komponent)

Tillgängliga funktioner:

* getPopularRecipes()
    Hämtar 8 st populära recept som returneras i formen: 
[
    {
        id: 123456
        title: 'title'
        image: 'imgUrl'
        img-type: 'jpg'
    },
    {...},
    ...
]


* filterRecipes(ingredients, mealtype, intolerances, diet)
    parametrar: 
        -ingredients: en kommaseparerad lista med ingredienser som sökresultaten ska innehålla.
        -mealtyp: 'breakfast'/'lunch'/'dinner'
        -intollerances: en kommaseparerad lista med allergener som inte får vara med i resultaten.
            Dairy
            Egg
            Gluten
            Grain
            Peanut
            Seafood
            Sesame
            Shellfish
            Soy
            Sulfite
            Tree Nut
            Wheat
        -diet: dietära val som kan kombineras i en kommaseparerad lista (AND), eller separeras med | (OR)
            Gluten free
            Ketogenic
            Vegetarian
            Lacto-Vegetarian
            Ovo-Vegetarian
            Vegan
            Pescetarian
            Paleo
            Primal
            Whole30

    Funktionen hämtar från två endpoints och returnerar de resultat som är 
    gemensamma och alltså stämmer in på alla kriterier.
    Returnerar:
[
    {
        id: 123456
        title: 'title'
        image: 'imgUrl'
        img-type: 'jpg'
    },
    {...},
    ...
]

* getSimilarRecipes(id)
    hämtar recept liknande det vars id anges som argument.
    Returnerar:
[
    {
        "id": 209128,
        "title": "Dinner Tonight: Grilled Romesco-Style Pork",
        "imageType": "jpg",
        "readyInMinutes": 45,
        "servings": 4,
        "sourceUrl": "http://www.seriouseats.com/recipes/2008/07/grilled-romesco-style-pork-salad-recipe.html"
    },
    {
        "id": 31868,
        "title": "Dinner Tonight: Chickpea Bruschetta",
        "imageType": "jpg",
        "readyInMinutes": 45,
        "servings": 2,
        "sourceUrl": "http://www.seriouseats.com/recipes/2009/06/dinner-tonight-chickpea-bruschetta-babbo-nyc-recipe.html"
    }
]

* getRecipeById(id)
    hämtar fullständig info om ett recept med hjälp av id.

        returnerar:

{
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  sustainable: false,
  lowFodmap: false,
  weightWatcherSmartPoints: 11,
  gaps: 'no',
  preparationMinutes: 25,
  cookingMinutes: 10,
  aggregateLikes: 65,
  healthScore: 4,
  creditsText: 'Amuse Your Bouche',
  sourceName: 'Amuse Your Bouche',
  pricePerServing: 59.82,
  extendedIngredients: [
    {
      id: 1002030,
      aisle: 'Spices and Seasonings',
      image: 'pepper.jpg',
      consistency: 'SOLID',
      name: 'bell pepper',
      nameClean: 'black pepper',
      original: 'Black pepper',
      originalName: 'Black pepper',
      amount: 4,
      unit: 'servings',
      meta: [Array],
      measures: [Object]
    },
    {
      id: 1001,
      aisle: 'Milk, Eggs, Other Dairy',
      ... (Fortsätter med samtliga ingredienser som egna objekt)
    }
  ],
  id: 578456,
  title: 'Macaroni cheese fritters',
  readyInMinutes: 35,
  servings: 4,
  sourceUrl: 'http://www.amuse-your-bouche.com/macaroni-cheese-fritters',
  image: 'https://spoonacular.com/recipeImages/578456-556x370.jpg',
  imageType: 'jpg',
  summary: `Macaroni cheese fritters requires around <b>35 minutes</b> from start to finish. This recipe serves 4 and costs 60 cents per serving. One serving contains <b>332 calories</b>, <b>13g of protein</b>, and <b>18g of fat</b>. Head to the store and pick up nutmeg, flour, cheddar cheese, and a few other things to make it today. This recipe from Amuse Your Bouche has 65 fans. A couple people really liked this main course. All things considered, we decided this recipe <b>deserves a spoonacular score of 69%</b>. This score is pretty good. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/macaroni-cheese-fritters-578245">Macaroni cheese fritters</a>, <a href="https://spoonacular.com/recipes/gruyre-and-emmentaler-macaroni-with-ham-and-cubed-sourdough-from-melt-the-art-of-macaroni-and-cheese-157433">Gruyère and Emmentaler Macaroni with Ham and Cubed Sourdough From 'Melt: The Art of Macaroni and Cheese</a>, and <a href="https://spoonacular.com/recipes/smoked-cheddar-and-blue-cheese-brisket-macaroni-and-cheese-536092">Smoked Cheddar and Blue Cheese Brisket Macaroni and Cheese</a>.`,
  cuisines: [],
  dishTypes: [ 'side dish', 'lunch', 'main course', 'main dish', 'dinner' ],
  diets: [],
  occasions: [],
  winePairing: {
    pairedWines: [],
    pairingText: 'No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.',
    productMatches: []
  },
  instructions: "Boil the pasta until cooked, and then drain.Meanwhile, melt the butter in a saucepan, and add the onion and garlic. Cook over a medium-low heat for a few minutes, until soft and translucent. Turn the heat down pretty low and add one tablespoon of the flour (not all of it!). Stir constantly for one minute, before adding the milk. Stir again until the mixture thickens into a white sauce. Season generously and add a pinch of nutmeg. Then add the cheese, and stir it into the sauce until it melts. Remove from the heat, and add the drained pasta. Mix to combine, and set aside to cool for a few minutes.When the macaroni cheese has cooled for a few minutes, add the remaining 3tbsp of flour and stir to combine. The mixture should be fairly thick at this stage. Add the egg, and mix well.If you've chosen to bake your fritters, spread out dollops of the mixture on a lightly greased baking sheet, and bake for around 30 minutes at 200C (Gas Mark 6 / 400F).If frying, add a few tablespoons of oil to a frying pan (just enough to cover the bottom of the pan), and heat until the oil sizzles when you add a small drop of batter.Drop a couple of tablespoons of the mixture into the pan, and smooth it out until you're happy with the fritter shape. Cook for a few minutes over a medium heat, until the underside is golden brown, then carefully flip it over and repeat with the other side. Remove from the pan and set on some kitchen paper to drain any excess oil.Do this for the remaining fritter mixture - I was able to do about 3 fritters at a time in my pan, but this depends on the size of your frying pan.",
  analyzedInstructions: [ { name: '', steps: [Array] } ],
  originalId: null
}