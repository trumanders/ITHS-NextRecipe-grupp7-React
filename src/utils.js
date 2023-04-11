const key = 'ce78851c6bc24bf4944626cc0c04848e'
// getPopularRecipes()

//getRecipeByFilter('dinner', '', 'vegetarian')

//filterRecipes('beef,tomato', 'dinner', 'gluten', 'paleo')

export async function getAllRecipes() {
    let allRecipes = []
    let number = 100 //antal som ska hämtas
    let skip = 0 //antal som ska hoppas över
    let totalNumber = 0

    do {
        try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?number=${number}&offset=${skip}`

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': `${key}`
            }
        })
    
        var data = await response.json()
    
        data.results.forEach(item => {
            allRecipes.push(
                item
            )
        })
        } catch(e) {
            console.log(e)
        }
    
    totalNumber = data.totalResults
    skip = allRecipes.length
    console.log(allRecipes.length)
    number = (totalNumber - skip) >= 100 ? 100 : (totalNumber - skip) 

    } while(allRecipes.length < 200) //hämtar 200 recept. För samtliga recept - (allRecipes.length < totalNumber)

    return allRecipes
}

export async function getPopularRecipes() {
    let fetchResults = []

    const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=8', {
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

    //console.log(fetchResults)
    return fetchResults
}

export async function getRecipeByIngredients(ingredients) {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=100`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': `${key}`
        }
    })

    const data = await response.json()

    return data
}

export async function getRecipeByFilter(mealtype, intolerances, diet, skip) {
    let allRecipes = []
    let number = 100 //antal som ska hämtas
    //let skip = 0 //antal som ska hoppas över
    let totalNumber = 0
    do {
    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?type=${mealtype}&diet=${diet}&intolerances=${intolerances}&number=${number}&offset=${skip}`

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': `${key}`
            }
        })
    
        var data = await response.json()
    
        data.results.forEach(item => {
            allRecipes.push(
                item
            )
        })
    } catch(e) {
        console.log(e)
    }

    totalNumber = data.totalResults
    skip = allRecipes.length

    number = (totalNumber - skip) >= 100 ? 100 : (totalNumber - skip)

    }while(allRecipes.length < 100)

    return allRecipes
}

export async function filterRecipes(ingredients, mealtype, intolerances, diet) {
    var searchResults = [] //Där resultaten sen ska hamna
    var skip = 0

    const ingredientGet = ingredients === '' ? false : await getRecipeByIngredients(ingredients)
    // console.log(`ingredientGet: ${ingredientGet.length}`)
    if(ingredientGet != false) {
        do{
        const filterGet = await getRecipeByFilter(mealtype, intolerances, diet, skip)
        // console.log(`filterGet: ${filterGet.length}`)
        const ingredientGetIds = ingredientGet.map(element => {
            return element.id
        })

        var intersect = filterGet.filter(item => ingredientGetIds.includes(item.id)) //plockar ut de objekt som finns i båda resultaten

        intersect.forEach(item => {
            searchResults.push(item)
        })
        ////-------------------><----------------------////
        //Lägg till funktion som sållar bort dubletter vid multipla 'filterGet'.

        skip += 100
        }while(searchResults.length < 10)
        // console.log(`filtrerade resultat: ${searchResults} skip: ${skip}`)
        console.log(searchResults)
        return searchResults
    } else {
        const filterGet = await getRecipeByFilter(mealtype, intolerances, diet, skip)
        //console.log(`resultat från den ena hämtningen: ${filterGet.length}`)
        
        return filterGet
    }

}