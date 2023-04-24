import './Recipe.css'
import './PictureAndInfo.css'
import './NutritionTable.css'
import './Ingredient.css'
import './Instructions.css'
import {getRecipeById, getSimilarRecipes} from '../../../utils'
import React, { useEffect, useState } from 'react'
import {TfiTimer} from 'react-icons/tfi'
import {BiDish} from 'react-icons/bi'
import {useLoaderData} from 'react-router-dom'

import RecipeCard from '../RecipeCard/RecipeCard'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { get } from 'react-hook-form'

const key = '338a43afc1f444c08393d10c361ea4e9';

export async function loader({ params }) {
    const recipe = await getRecipeById(params.recipeId)
    return { recipe }
}

export default function Recipe(){
    const { recipe } = useLoaderData()
    // const [recipe, setRecipe] = useState(null);
    const [similars, setSimilars] = useState();
    const [showNutritions, setShowNutritions] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    const [showSteps, setShowSteps] = useState(false);
    const [isMobile, setMobile] = useState(window.innerWidth<730);

    // const [liknande, setLiknande] = useState(null);

    //Denna del av Shakiba
    const updateMedia = () =>{
        setMobile(window.innerWidth<730)
    }

    //Denna del av Shakiba för rerender vid mobil version för show/hide button
    useEffect(()=>{
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [isMobile]);

    //Hämta information för recept
    // useEffect(()=>{
    //     const fetchData = async () =>{
    //     let id = 615761; //detta id ersätts sen av props
    //     let response = await getRecipeById(id);
    //     //console.log(response);
    //     setRecipe(response); 
    
    // }
    //     fetchData();
    // },[])

    //Hämta liknande recept
    useEffect(()=>{
        const fetchData = async () =>{ 
        //let id = 615761; //detta id ersätts sen av props
        let response = await getSimilarRecipes(recipe.id);
        //console.log(response); 
        setSimilars(response);
    }
        fetchData();
        // console.log(similars);
    },[])


    function handleShowNutritions(){
        setShowNutritions(!showNutritions);
    }

    function handleShowIngredients(){
        setShowIngredients(!showIngredients);
    }

    function handleShowSteps(){
        setShowSteps(!showSteps);
    }

    if((recipe != null) && (similars != null)){
        
        return(
            <>  
                <h2>{recipe.title}</h2>
                <div className="recipe-container">
                
                    <div className="picture-pictureInfo-and-nutritionTable-container">
                        <div className="recipe-section-pictureAndInfo">
                            <PictureAndInfo image = {recipe.image} cookTime = {recipe.readyInMinutes} serving = {recipe.servings}/>
                        </div>
                        <>
                            {/* Kollar om mobile version */}
                            {isMobile? 
                                /*Om Mobilversion*/
                                (<div className='showMorebtn' >
                                    {/* Sätt en knapp för att visa nutritions*/}
                                    <button className='showButton' onClick={handleShowNutritions}>
                                        {/* I och med boolean, första värde på showMore = false */}
                                        {showNutritions? 'Hide': 'Show'} Nutritions
                                    </button>
                                    {/* När showMore = sant, visas nutrition tabell. {showMore && } fungerar som if(showMore == true)*/}
                                    {showNutritions && 
                                        <div className="recipe-section-nutritionTable">
                                            <NutritionTable nutritionValues = {recipe.nutrition.nutrients.slice(0,9)} />
                                        </div>}
                                </div>):
                                /* Om inte mobilversion */
                                (<div className="recipe-section-nutritionTable">
                                    <NutritionTable nutritionValues = {recipe.nutrition.nutrients.slice(0,9)} />
                                </div>)}
                        </>
                    </div>

                    <div className="recipe-section-ingredients">
                        {/* Kollar om mobile version */}
                        {isMobile?
                            (<div className='showMorebtn' >
                                {/* Sätt en knapp för att visa nutritions*/}
                                <button className='showButton' onClick={handleShowIngredients}>
                                    {/* I och med boolean, första värde på showMore = false */}
                                    {showIngredients? 'Hide': 'Show'} Ingredients
                                </button>
                                {/* När showMore = sant, visas ingrediens lista. {showMore && } fungerar som if(showMore == true)*/}
                                {showIngredients && 
                                        
                                    <Ingredient ingredients = {recipe.extendedIngredients} />
                                }
                            </div>):
                            /* Om inte mobilversion */
                            (
                                <Ingredient ingredients = {recipe.extendedIngredients} />
                            )
                        
                        }
                            
                    </div>
    
                    <div className="recipe-section-instructions">
                        {/* Kollar om mobile version */}
                        {isMobile?
                            (
                                <div className='showMorebtn' >
                                    {/* Sätt en knapp för att visa nutritions*/}
                                    <button className='showButton' onClick={handleShowSteps}>
                                        {/* I och med boolean, första värde på showMore = false */}
                                        {showSteps? 'Hide': 'Show'} Steps
                                    </button>
                                    {/* När showMore = sant, visas ingrediens lista. {showMore && } fungerar som if(showMore == true)*/}
                                    {showSteps && 
                                        
                                        <Instructions steps = {recipe.instructions} />
                                    }
                                </div>
                            )
                            :
                            (
                                /* Om inte mobilversion */
                                (
                                    <Instructions steps = {recipe.instructions} />
                                )
                            )
                        }
        
                    </div> 

                    <div className='similar-recipes'>
                        <SimilarsMemo similaRecipesWithoutImage = {similars}/>
                        {/* {similars.map(rec => <RecipeCard id = {rec.Id} image={rec.Image} title={rec.Title} />)} */}
                    </div>                          
                </div>
            </> 
             
        )
    }
}

//Komponent som håller Bild, antal servings och tid att laga
const PictureAndInfo = (props) => {
    return(
        <article className='picture-and-info-container'>
            <img className="recipe-picture" src={props.image} alt="Image of recipe" />
            {/*Att styla sen med fontawsome*/}
            <div className='extra-recipe-info'>
                <div>
                    <b><TfiTimer /></b> {'   '}
                    <span><b>{props.cookTime}</b></span>
                    <span><b>min.</b></span>
                </div>
                <div>
                <b><BiDish /></b> {'   '}
                    <span><b>{props.serving}</b></span>
                    <span><b>people</b></span>
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
            <thead>
                <tr>
                  <th>Nutritions</th>
                  <th>Amount</th>
                </tr>
            </thead>
              
              {props.nutritionValues.map((nutr, index) => nutr.name !== "Net Carbohydrates" &&
                <tbody>
                    <tr key={index}>
                        <td><b>{nutr.name}</b></td>
                        <td><b>{nutr.amount}{' '}{nutr.unit}</b></td>
                    </tr>
                </tbody>
              )}                 
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
                {props.ingredients.map((ingredient, index) => <li key={index} className="list-row"> 
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
            <div className='instructions' dangerouslySetInnerHTML={{__html: props.steps.replaceAll(". ", ".<br/>")}}></div>
        </div> 
    )
}

const Similars = (props) => { 

    //const ids = props.similaRecipesWithoutImage.map(x => x.id);

    console.log(props.similaRecipesWithoutImage[0].id);
    console.log(props.similaRecipesWithoutImage[1].id);
    console.log(props.similaRecipesWithoutImage[2].id);

    const[similar1, setSimilar1] = useState(null);
    const[similar2, setSimilar2] = useState(null);
    const[similar3, setSimilar3] = useState(null);

    useEffect(()=>{
        const fetchData = async () =>{
        let response = await getRecipeById(props.similaRecipesWithoutImage[0].id);
        //console.log(response);
        setSimilar1(response); 
    
    }
        fetchData();
    },[])

    useEffect(()=>{
        const fetchData = async () =>{
        let response = await getRecipeById(props.similaRecipesWithoutImage[1].id);
        //console.log(response);
        setSimilar2(response); 
    
    }
        fetchData();
    },[])

    useEffect(()=>{
        const fetchData = async () =>{
        let response = await getRecipeById(props.similaRecipesWithoutImage[2].id);
        //console.log(response);
        setSimilar3(response); 
    
    }
        fetchData();
    },[])

    if((similar1 != null) && (similar2 != null) && (similar3 != null)){
        
        return(
            <>
                <RecipeCard id={similar1.id} image={similar1.image} title={similar1.title}/>
                <RecipeCard id={similar2.id} image={similar2.image} title={similar2.title}/>
                <RecipeCard id={similar3.id} image={similar3.image} title={similar3.title}/>
            </>
        )
    }

    
}

const SimilarsMemo = React.memo(Similars); //För att stoppa re-renderingsproblem

/*                        ATT JOBBA PÅ FÖR ATT UNDVIKA HÅRDKODNINGEN I SIMILARS                   */
// const ids = props.similaRecipesWithoutImage.map(x => x.id);
//     //let svar;
//     //console.log(ids);

//     const promises = ids.map(async(id)=>{
//         return await getRecipeById(id);
//     })

//     const getPromises = async () =>{
//         const response = await Promise.all(promises);
        
//         //console.log(response.map(elem => elem.id +" "+ elem.image +" "+ elem.title));

//         if(response){
//             //console.log('success');
//             return(response);
//         }
//     }
    
//     getPromises()
//     .then(value =>{
//         console.log(value);
//     })