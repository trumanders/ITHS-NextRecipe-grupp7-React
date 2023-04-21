import './Recipe.css'
import './PictureAndInfo.css'
import './NutritionTable.css'
import './Ingredient.css'
import './Instructions.css'
import {getRecipeById, getSimilarRecipes} from '../../../utils'
import React, { useEffect, useState } from 'react'
import {TfiTimer} from 'react-icons/tfi'
import {BiDish} from 'react-icons/bi'

import RecipeCard from '../RecipeCard/RecipeCard'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const key = '338a43afc1f444c08393d10c361ea4e9';

export default function Recipe(){
   
    const [recipe, setRecipe] = useState(null);
    const [similars, setSimilars] = useState(null);
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
    useEffect(()=>{
        const fetchData = async () =>{
        let id = 615761; //detta id ersätts sen av props
        let response = await getRecipeById(id);
        //console.log(response);
        setRecipe(response); 
    
    }
        fetchData();
    },[])

    //Hämta linkande recept
    useEffect(()=>{
        const fetchData = async () =>{ 
        let id = 615761; //detta id ersätts sen av props
        let response = await getSimilarRecipes(id);
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
    
                    <div className=".recipe-section-instructions">
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
                        <Similars similaRecipesWithoutImage = {similars}/>
                        {/* {similars.map(rec => <RecipeCard id = {rec.id} image={recipe.imageType} title={rec.title} />)} */}
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

    console.log(props.similaRecipesWithoutImage.map(x => x.id));

    return(
        <div>
            <h2>Similar Recipes</h2>
            <ul>
            {props.similaRecipesWithoutImage.map((element, index) => {
                <li key={index}>{element.id}</li>
            })}
        </ul>
        </div>
    )

}

const SimilarsMemo = React.memo(Similars); //För att stoppa re-renderingsproblem

    // const [similarsInfo, setsimilarsInfo] = useState(null);

    // useEffect(()=>{
    //     let responseArray = [];
    //     // let cancel = false;
    //     const getImages = async () => {
    //         props.similaRecipesWithoutImage.map(async(element) =>{
    //             const response = await getRecipeById(element.id);
    //             responseArray.push(response);
    //             setsimilarsInfo((prevSimilarsInfo) => [...prevSimilarsInfo, responseArray]);
    //             console.log(similarsInfo)
    //         })
    //     }
    //     getImages();
    //     //console.log(similarsInfo)
    //     // return () => {
    //     //     cancel = true
    //     // }
        
    // },[])

    // useEffect(()=>{
    //     const fetchData = async () =>{
    //     let id = 615761; //detta id ersätts sen av props
    //     let response = await getRecipeById(id);
    //     //console.log(response);
    //     setRecipe(response); 
    
    // }
    //     fetchData();
    // },[])