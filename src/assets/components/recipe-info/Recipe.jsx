import './Recipe.css'
import './PictureAndInfo.css'
import './NutritionTable.css'
import './Ingredient.css'
import './Instructions.css'



export default function Recipe(){
    const recipe = getRecipe();
    const nutritions = getNutrition();

    return(
        <>
         <h2>{recipe.title}</h2>
          <div className="recipe-container">
           
              <div className="picture-pictureInfo-and-nutritionTable-container">
                  <div className="recipe-section-pictureAndInfo">
                    <PictureAndInfo image = {recipe.image} cookTime = {recipe.readyInMinutes} serving = {recipe.servings}/>
                  </div>

                  <div className="recipe-section-nutritionTable">
                    <NutritionTable nutritionValues = {nutritions['bad']} proteins = {nutritions[`protein`]} />
                  </div>
              </div>

              <div className="recipe-section-ingredients">
                      <Ingredient ingredients = {recipe.extendedIngredients} />
              </div>

              <div className="recipe-section-insturcions">
                      <Instructions steps = {recipe.instructions} />
              </div>            
            
        </div>
        </>
         
    )
}

//Komponent som håller Bild, antal servings och tid att laga
const PictureAndInfo = (props) => {
    return(
        <article className='picture-and-info-container'>
            <img className="recipe-picture" src={props.image} alt="Image of recipe" />
            {/*Att styla sen med fontawsome*/}
            <div className='extra-recipe-info'>
                <div>
                    <span>Cook time: </span>
                    <span>{props.cookTime}</span>
                    <span> min.</span>
                </div>
                <div>
                    <span>Servings: </span>
                    <span>{props.serving}</span>
                    <span> people</span>
                </div>
            </div>
        </article>  
    )
}

//Komponent med tabell som håller näringsinnehållet.
const NutritionTable = (props) => {
    return(
        <aside className='nutrition-table-container'>
          <table className="nutrition-table">
              <tr>
                  <th>Nutritions</th>
                  <th>Amount</th>
              </tr>
              {props.nutritionValues.map(nutr => <tr>
                  <td>{nutr.title}</td>
                  <td>{nutr.amount}</td>
              </tr>)}                 
              <tr>
                  <td>Protein</td>
                  <td>{props.proteins}</td>
              </tr>
          </table>
        </aside>  )
}

//Komponent som håller ingredienser och mått
const Ingredient = (props) => {
    return(
        <div className="ingredients-container">
            <h2>Ingredients</h2>
            <ul className="list-ingredients">
                {/* list-row" för att kunna arrangera olika information av samma ingrediens med hjälp av flex */}
                {props.ingredients.map(ingredient => <li className="list-row"> 
                    <div className='ingredient-name'><b>{ingredient.nameClean}</b></div>
                    <div className='amount-unit'><span>{ingredient.amount}</span>{' '} <span>{ingredient.unit}</span></div>
                </li> )}
            </ul>
        </div>
    )
}

//Komponent som håller i stegen
const Instructions = (props) => {
    return(
        <div className='instructions-container'>
            <h2>Steps</h2>
            <div className='instructions' dangerouslySetInnerHTML={{__html: props.steps}}></div>
        </div> 
    )
}

function getRecipe(){
    return(
        {
            vegetarian: false, 
            vegan: false,      
            glutenFree: true,  
            dairyFree: true,   
            veryHealthy: false,
            cheap: false,      
            veryPopular: true,
            sustainable: false,
            lowFodmap: false,
            weightWatcherSmartPoints: 6,
            gaps: 'no',
            preparationMinutes: 10,
            cookingMinutes: 120,
            aggregateLikes: 32767,
            healthScore: 33,
            creditsText: 'pinkwhen.com',
            sourceName: 'pinkwhen.com',
            pricePerServing: 206.6,
            extendedIngredients: [
              {
                id: 10211821,
                aisle: 'Produce',
                image: 'bell-pepper-orange.png',
                consistency: 'SOLID',
                name: 'bell pepper',
                nameClean: 'bell pepper',
                original: '1/4 cup bell pepper',
                originalName: 'bell pepper',
                amount: 0.25,
                unit: 'cup',
                meta: [],
                measures: [Object]
              },
              {
                id: 16034,
                aisle: 'Canned and Jarred',
                image: 'kidney-beans.jpg',
                consistency: 'SOLID',
                name: 'kidney beans',
                nameClean: 'canned kidney beans',
                original: '1 (15 oz) can kidney beans',
                originalName: 'kidney beans',
                amount: 15,
                unit: 'oz',
                meta: [Array],
                measures: [Object]
              },
              {
                id: 16044,
                aisle: 'Canned and Jarred',
                image: 'pinto-beans.jpg',
                consistency: 'SOLID',
                name: 'pinto beans',
                nameClean: 'canned pinto beans',
                original: '1 (15 oz) can pinto beans',
                originalName: 'pinto beans',
                amount: 15,
                unit: 'oz',
                meta: [Array],
                measures: [Object]
              },
              {
                id: 2031,
                aisle: 'Spices and Seasonings',
                image: 'chili-powder.jpg',
                consistency: 'SOLID',
                name: 'cayenne pepper',
                nameClean: 'ground cayenne pepper',
                original: '1/4 tsp cayenne pepper',
                originalName: 'cayenne pepper',
                amount: 0.25,
                unit: 'tsp',
                meta: [],
                measures: [Object]
              },
              {
                id: 2009,
                aisle: 'Spices and Seasonings',
                image: 'chili-powder.jpg',
                consistency: 'SOLID',
                name: 'chili powder',
                nameClean: 'chili powder',
                original: '1/2 Tbsp chili powder',
                originalName: 'chili powder',
                amount: 0.5,
                unit: 'Tbsp',
                meta: [],
                measures: [Object]
              },
              {
                id: 1002014,
                aisle: 'Spices and Seasonings',
                image: 'ground-cumin.jpg',
                consistency: 'SOLID',
                name: 'cumin',
                nameClean: 'cumin',
                original: '1 1/2 tsp cumin',
                originalName: 'cumin',
                amount: 1.5,
                unit: 'tsp',
                meta: [],
                measures: [Object]
              },
              {
                id: 23557,
                aisle: 'Meat',
                image: 'fresh-ground-beef.jpg',
                consistency: 'SOLID',
                name: 'ground beef',
                nameClean: '95 percent lean ground beef',
                original: '2 lbs lean ground beef',
                originalName: 'lean ground beef',
                amount: 2,
                unit: 'lbs',
                meta: [Array],
                measures: [Object]
              },
              {
                id: 11282,
                aisle: 'Produce',
                image: 'brown-onion.png',
                consistency: 'SOLID',
                name: 'onions',
                nameClean: 'onion',
                original: '1 1/2 cups chopped onions',
                originalName: 'chopped onions',
                amount: 1.5,
                unit: 'cups',
                meta: [Array],
                measures: [Object]
              },
              {
                id: 2027,
                aisle: 'Produce;Spices and Seasonings',
                image: 'oregano.jpg',
                consistency: 'SOLID',
                name: 'oregano',
                nameClean: 'oregano',
                original: '1/2 tsp oregano',
                originalName: 'oregano',
                amount: 0.5,
                unit: 'tsp',
                meta: [],
                measures: [Object]
              },
              {
                id: 1002030,
                aisle: 'Spices and Seasonings',
                image: 'pepper.jpg',
                consistency: 'SOLID',
                name: 'group pepper',
                nameClean: 'black pepper',
                original: '1 tsp group black pepper',
                originalName: 'group black pepper',
                amount: 1,
                unit: 'tsp',
                meta: [Array],
                measures: [Object]
              },
              {
                id: 10011693,
                aisle: 'Canned and Jarred',
                image: 'tomatoes-canned.png',
                consistency: 'SOLID',
                name: 'tomato juice',
                nameClean: 'canned tomatoes',
                original: '1 (46 oz) can tomato juice',
                originalName: 'tomato juice',
                amount: 46,
                unit: 'oz',
                meta: [Array],
                measures: [Object]
              },
              {
                id: 10011693,
                aisle: 'Canned and Jarred',
                image: 'tomatoes-canned.png',
                consistency: 'SOLID',
                name: 'tomato paste',
                nameClean: 'canned tomatoes',
                original: '2 (6oz) cans tomato paste',
                originalName: 'tomato paste',
                amount: 12,
                unit: 'oz',
                meta: [Array],
                measures: [Object]
              },
              {
                id: 14412,
                aisle: 'Beverages',
                image: 'water.png',
                consistency: 'LIQUID',
                name: 'water',
                nameClean: 'water',
                original: '1 cup water',
                originalName: 'water',
                amount: 1,
                unit: 'cup',
                meta: [],
                measures: [Object]
              },
              {
                id: 10719335,
                aisle: 'Baking',
                image: 'sugar-in-bowl.png',
                consistency: 'SOLID',
                name: 'sugar',
                nameClean: 'granulated sugar',
                original: '1/2 tsp white sugar',
                originalName: 'white sugar',
                amount: 0.5,
                unit: 'tsp',
                meta: [Array],
                measures: [Object]
              }
            ],
            id: 715424,
            title: 'The Best Chili',
            readyInMinutes: 130,
            servings: 8,
            sourceUrl: 'http://www.pinkwhen.com/the-best-chili-recipe/',
            image: 'https://spoonacular.com/recipeImages/715424-556x370.jpg',
            imageType: 'jpg',
            summary: 'Need a <b>gluten free and dairy free main course</b>? The Best Chili could be an excellent recipe to try. This recipe makes 8 servings with <b>326 calories</b>, <b>33g of protein</b>, and <b>7g of fat</b> each. For <b>$2.07 per serving</b>, this recipe <b>covers 29%</b> of your daily requirements of vitamins and minerals. This recipe from Pink When has 32767 fans. <b>The Super Bowl</b> will be even more special with this recipe. From preparation to the plate, this recipe takes roughly <b>2 hours and 10 minutes</b>.',
            cuisines: [ 'American' ],
            dishTypes: [ 'lunch', 'soup', 'main course', 'main dish', 'dinner' ],
            diets: [ 'gluten free', 'dairy free' ],
            occasions: [ 'super bowl' ],
            winePairing: {
              pairedWines: [ 'cava', 'shiraz', 'grenache' ],
              pairingText: "Cava, Shiraz, and Grenache are great choices for Chili. These juicy reds don't have too much tannin (important for spicy foods), but a sparkling wine like cava can tame the heat even better. The Poema Cava Brut rosé with a 4.4 out of 5 star rating seems like a good match. It costs about 14 dollars per bottle.",
              productMatches: [ [Object] ]
            },
            instructions: '<ol><li>Brown the lean ground beef in a deep skillet. Cook over medium heat until cooked all the way through, and then drain.</li><li>In a large pan over high heat add in all of your additional ingredients: cooked ground beef, tomato juice, kidney beans, pinto beans, water, tomato paste, chili powder, cumin, black pepper, oregano, sugar, cayenne pepper, bell pepper, and chopped onions.</li><li>Bring to a boil.</li><li>Once your large pot of chili has started to boil, lower the heat and simmer for 2 hours uncovered.</li></ol>',
            analyzedInstructions: [ { name: '', steps: [Array] } ],
            originalId: null,
            spoonacularSourceUrl: 'https://spoonacular.com/the-best-chili-715424'
          }
    );
}

function getNutrition(){
    return({
        calories: '325',      
        carbs: '34g',
        fat: '6g',
        protein: '33g',       
        bad: [
          {
            title: 'Calories',
            amount: '325',
            indented: false,
            percentOfDailyNeeds: 16.29
          },
          {
            title: 'Fat',
            amount: '6g',
            indented: false,
            percentOfDailyNeeds: 10.7
          },
          {
            title: 'Saturated Fat',
            amount: '2g',
            indented: true,
            percentOfDailyNeeds: 17.34
          },
          {
            title: 'Carbohydrates',
            amount: '34g',
            indented: false,
            percentOfDailyNeeds: 11.64
          },
          {
            title: 'Sugar',
            amount: '12g',
            indented: true,
            percentOfDailyNeeds: 13.73
          },
          {
            title: 'Cholesterol',
            amount: '70mg',
            indented: false,
            percentOfDailyNeeds: 23.44
          },
          {
            title: 'Sodium',
            amount: '636mg',
            indented: false,
            percentOfDailyNeeds: 27.67
          }
        ],
        good: [
          {
            title: 'Protein',
            amount: '33g',
            indented: false,
            percentOfDailyNeeds: 66.84
          },
          {
            title: 'Zinc',
            amount: '7mg',
            indented: false,
            percentOfDailyNeeds: 47.1
          },
          {
            title: 'Vitamin B3',
            amount: '9mg',
            indented: false,
            percentOfDailyNeeds: 46.56
          },
          {
            title: 'Vitamin B6',
            amount: '0.9mg',
            indented: false,
            percentOfDailyNeeds: 44.95
          },
          {
            title: 'Vitamin B12',
            amount: '2µg',
            indented: false,
            percentOfDailyNeeds: 42.34
          },
          {
            title: 'Phosphorus',
            amount: '409mg',
            indented: false,
            percentOfDailyNeeds: 40.95
          },
          {
            title: 'Manganese',
            amount: '0.81mg',
            indented: false,
            percentOfDailyNeeds: 40.61
          },
          {
            title: 'Iron',
            amount: '7mg',
            indented: false,
            percentOfDailyNeeds: 40.48
          },
          {
            title: 'Fiber',
            amount: '10g',
            indented: false,
            percentOfDailyNeeds: 40.38
          },
          {
            title: 'Potassium',
            amount: '1354mg',
            indented: false,
            percentOfDailyNeeds: 38.71
          },
          {
            title: 'Vitamin C',
            amount: '27mg',
            indented: false,
            percentOfDailyNeeds: 33.89
          },
          {
            title: 'Copper',
            amount: '0.66mg',
            indented: false,
            percentOfDailyNeeds: 32.86
          },
          {
            title: 'Selenium',
            amount: '21µg',
            indented: false,
            percentOfDailyNeeds: 31.21
          },
          {
            title: 'Magnesium',
            amount: '106mg',
            indented: false,
            percentOfDailyNeeds: 26.55
          },
          {
            title: 'Vitamin E',
            amount: '3mg',
            indented: false,
            percentOfDailyNeeds: 23.43
          },
          {
            title: 'Vitamin B2',
            amount: '0.35mg',
            indented: false,
            percentOfDailyNeeds: 20.76
          },
          {
            title: 'Vitamin B1',
            amount: '0.31mg',
            indented: false,
            percentOfDailyNeeds: 20.34
          },
          {
            title: 'Folate',
            amount: '67µg',
            indented: false,
            percentOfDailyNeeds: 16.81
          },
          {
            title: 'Vitamin K',
            amount: '16µg',
            indented: false,
            percentOfDailyNeeds: 15.49
          },
          {
            title: 'Vitamin A',
            amount: '767IU',
            indented: false,
            percentOfDailyNeeds: 15.34
          },
          {
            title: 'Vitamin B5',
            amount: '1mg',
            indented: false,
            percentOfDailyNeeds: 15.01
          },
          {
            title: 'Calcium',
            amount: '135mg',
            indented: false,
            percentOfDailyNeeds: 13.59
          }
        ],
        nutrients: [
          {
            name: 'Calories',
            amount: 325.78,
            unit: 'kcal',
            percentOfDailyNeeds: 16.29
          },
          { name: 'Fat', amount: 6.95, unit: 'g', percentOfDailyNeeds: 10.7 },
          {
            name: 'Saturated Fat',
            amount: 2.77,
            unit: 'g',
            percentOfDailyNeeds: 17.34
          },
          {
            name: 'Carbohydrates',
            amount: 34.93,
            unit: 'g',
            percentOfDailyNeeds: 11.64
          },
          {
            name: 'Net Carbohydrates',
            amount: 24.84,
            unit: 'g',
            percentOfDailyNeeds: 9.03
          },
          {
            name: 'Sugar',
            amount: 12.35,
            unit: 'g',
            percentOfDailyNeeds: 13.73
          },
          {
            name: 'Cholesterol',
            amount: 70.31,
            unit: 'mg',
            percentOfDailyNeeds: 23.44
          },
          {
            name: 'Sodium',
            amount: 636.46,
            unit: 'mg',
            percentOfDailyNeeds: 27.67
          },
          {
            name: 'Protein',
            amount: 33.42,
            unit: 'g',
            percentOfDailyNeeds: 66.84
          },
          {
            name: 'Zinc',
            amount: 7.07,
            unit: 'mg',
            percentOfDailyNeeds: 47.1
          },
          {
            name: 'Vitamin B3',
            amount: 9.31,
            unit: 'mg',
            percentOfDailyNeeds: 46.56
          },
          {
            name: 'Vitamin B6',
            amount: 0.9,
            unit: 'mg',
            percentOfDailyNeeds: 44.95
          },
          {
            name: 'Vitamin B12',
            amount: 2.54,
            unit: 'µg',
            percentOfDailyNeeds: 42.34
          },
          {
            name: 'Phosphorus',
            amount: 409.48,
            unit: 'mg',
            percentOfDailyNeeds: 40.95
          },
          {
            name: 'Manganese',
            amount: 0.81,
            unit: 'mg',
            percentOfDailyNeeds: 40.61
          },
          {
            name: 'Iron',
            amount: 7.29,
            unit: 'mg',
            percentOfDailyNeeds: 40.48
          },
          {
            name: 'Fiber',
            amount: 10.09,
            unit: 'g',
            percentOfDailyNeeds: 40.38
          },
          {
            name: 'Potassium',
            amount: 1354.81,
            unit: 'mg',
            percentOfDailyNeeds: 38.71
          },
          {
            name: 'Vitamin C',
            amount: 27.96,
            unit: 'mg',
            percentOfDailyNeeds: 33.89
          },
          {
            name: 'Copper',
            amount: 0.66,
            unit: 'mg',
            percentOfDailyNeeds: 32.86
          },
          {
            name: 'Selenium',
            amount: 21.85,
            unit: 'µg',
            percentOfDailyNeeds: 31.21
          },
          {
            name: 'Magnesium',
            amount: 106.2,
            unit: 'mg',
            percentOfDailyNeeds: 26.55
          },
          {
            name: 'Vitamin E',
            amount: 3.51,
            unit: 'mg',
            percentOfDailyNeeds: 23.43
          },
          {
            name: 'Vitamin B2',
            amount: 0.35,
            unit: 'mg',
            percentOfDailyNeeds: 20.76
          },
          {
            name: 'Vitamin B1',
            amount: 0.31,
            unit: 'mg',
            percentOfDailyNeeds: 20.34
          },
          {
            name: 'Folate',
            amount: 67.24,
            unit: 'µg',
            percentOfDailyNeeds: 16.81
          },
          {
            name: 'Vitamin K',
            amount: 16.27,
            unit: 'µg',
            percentOfDailyNeeds: 15.49
          },
          {
            name: 'Vitamin A',
            amount: 767.13,
            unit: 'IU',
            percentOfDailyNeeds: 15.34
          },
          {
            name: 'Vitamin B5',
            amount: 1.5,
            unit: 'mg',
            percentOfDailyNeeds: 15.01
          },
          {
            name: 'Calcium',
            amount: 135.93,
            unit: 'mg',
            percentOfDailyNeeds: 13.59
          }
        ],
        properties: [
          { name: 'Glycemic Index', amount: 47.01, unit: '' },
          { name: 'Glycemic Load', amount: 10.28, unit: '' },
          { name: 'Nutrition Score', amount: 28.17913043478261, unit: '%' }
        ],
        flavonoids: [
          { name: 'Cyanidin', amount: 0, unit: 'mg' },
          { name: 'Petunidin', amount: 0, unit: '' },
          { name: 'Delphinidin', amount: 0, unit: '' },
          { name: 'Malvidin', amount: 0, unit: '' },
          { name: 'Pelargonidin', amount: 0, unit: '' },
          { name: 'Peonidin', amount: 0, unit: '' },
          { name: 'Catechin', amount: 0, unit: 'mg' },
          { name: 'Epigallocatechin', amount: 0, unit: 'mg' },
          { name: 'Epicatechin', amount: 0, unit: 'mg' },
          { name: 'Epicatechin 3-gallate', amount: 0, unit: 'mg' },
          { name: 'Epigallocatechin 3-gallate', amount: 0, unit: 'mg' },
          { name: 'Theaflavin', amount: 0, unit: '' },
          { name: 'Thearubigins', amount: 0, unit: '' },
          { name: 'Eriodictyol', amount: 0, unit: '' },
          { name: 'Hesperetin', amount: 0, unit: '' },
          { name: 'Naringenin', amount: 0, unit: '' },
          { name: 'Apigenin', amount: 0, unit: 'mg' },
          { name: 'Luteolin', amount: 0.03, unit: 'mg' },
          { name: 'Isorhamnetin', amount: 1.5, unit: 'mg' },
          { name: 'Kaempferol', amount: 0.2, unit: 'mg' },
          { name: 'Myricetin', amount: 0.01, unit: 'mg' },
          { name: 'Quercetin', amount: 6.1, unit: 'mg' },
          { name: "Theaflavin-3,3'-digallate", amount: 0, unit: '' },
          { name: "Theaflavin-3'-gallate", amount: 0, unit: '' },
          { name: 'Theaflavin-3-gallate', amount: 0, unit: '' },
          { name: 'Gallocatechin', amount: 0, unit: 'mg' }
        ],
        ingredients: [
          {
            id: 10211821,
            name: 'bell pepper',
            amount: 0.03,
            unit: 'cup',
            nutrients: [Array]
          },
          {
            id: 16034,
            name: 'kidney beans',
            amount: 1.88,
            unit: 'oz',
            nutrients: [Array]
          },
          {
            id: 16044,
            name: 'pinto beans',
            amount: 1.88,
            unit: 'oz',
            nutrients: [Array]
          },
          {
            id: 2031,
            name: 'cayenne pepper',
            amount: 0.03,
            unit: 'tsp',
            nutrients: [Array]
          },
          {
            id: 2009,
            name: 'chili powder',
            amount: 0.06,
            unit: 'Tbsp',
            nutrients: [Array]
          },
          {
            id: 1002014,
            name: 'cumin',
            amount: 0.19,
            unit: 'tsp',
            nutrients: [Array]
          },
          {
            id: 23557,
            name: 'ground beef',
            amount: 0.25,
            unit: 'lbs',
            nutrients: [Array]
          },
          {
            id: 11282,
            name: 'onions',
            amount: 0.19,
            unit: 'cups',
            nutrients: [Array]
          },
          {
            id: 2027,
            name: 'oregano',
            amount: 0.06,
            unit: 'tsp',
            nutrients: [Array]
          },
          {
            id: 1002030,
            name: 'group pepper',
            amount: 0.13,
            unit: 'tsp',
            nutrients: [Array]
          },
          {
            id: 10011693,
            name: 'tomato juice',
            amount: 5.75,
            unit: 'oz',
            nutrients: [Array]
          },
          {
            id: 10011693,
            name: 'tomato paste',
            amount: 1.5,
            unit: 'oz',
            nutrients: [Array]
          },
          {
            id: 14412,
            name: 'water',
            amount: 0.13,
            unit: 'cup',
            nutrients: [Array]
          },
          {
            id: 10719335,
            name: 'sugar',
            amount: 0.06,
            unit: 'tsp',
            nutrients: [Array]
          }
        ],
        caloricBreakdown: { percentProtein: 39.79, percentFat: 18.63, percentCarbs: 41.58 },
        weightPerServing: { amount: 491, unit: 'g' },
        expires: 1681729654459,
        isStale: false
      });
}