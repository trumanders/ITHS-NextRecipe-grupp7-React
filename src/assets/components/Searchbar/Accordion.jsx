import React, {useRef, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import listenForOutsideClicks from './listenForOutsideClicks';
import './Accordion.css';


export default function CustomAccordion({listType, setlistType, listDiet, setlistDiet, listIntolerances, setlistIntolerances}){
    const [isAccordionVisible, setIsAccordionVisible] = useState(false)
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)

    // Funktion för att ta emot flera värden från checkboxar, om checkad läggs värdet till i listan, om inte så tas värdet bort.
    const handleDietbox =(event) =>{
      
        const{value, checked} = event.target
        
        if(checked)
        {
         setlistDiet(diets => [...diets,value])
        }
        else(
         setlistDiet(diets => {
           return [...diets.filter(dietValue => dietValue !== value)]
         })
        )
 
    }

    const handleIntolerances =(event) => {
        const{value, checked} = event.target
       
       if(checked)
       {
        setlistIntolerances(intolerances => [...intolerances,value])
       }
       else(
        setlistIntolerances(diets => {
          return [...diets.filter(intolerances => intolerances !== value)]
        })
       )

    }
    //Sätter igång funktionen som kollar om man klickar utanför adv.search-rutan och då stänger densamma
    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsAccordionVisible))

    const toggle = (isAccordionVisible) => {
        return setIsAccordionVisible(!isAccordionVisible)
      }

    return (
      <div className='accordion-style' ref={menuRef}>
        <Button className="adv-button" type='button' onClick={() => {toggle(isAccordionVisible)}}>Filters</Button>
        {isAccordionVisible &&
          <div className="smallText">
            <div>
              <div><input type="checkbox" name="type" value="breakfast" onChange={listType === "breakfast" ? event => setlistType("") : event => setlistType(event.target.value)} checked={listType === "breakfast"}/> Breakfast {"    "}</div>
              <div><input type="checkbox" name="type" value="lunch" onChange={listType === "lunch" ? event => setlistType("") : event => setlistType(event.target.value)} checked={listType === "lunch"} /> Lunch {"    "}</div>
              <div><input type="checkbox" name="type" value="dinner" onChange={listType === "dinner" ? event => setlistType("") : event => setlistType(event.target.value)} checked={listType === "dinner"} /> Dinner </div>
            </div>
            <div className='diet-boxes'>
              <div><input type="checkbox" value="vegetarian" onChange={handleDietbox} checked={listDiet.includes("vegetarian")}/> Vegetarian{"    "}</div>
              <div><input type="checkbox" value="vegan" onChange={handleDietbox} checked={listDiet.includes("vegan")}/> Vegan{"    "}</div>
              <div><input type="checkbox" value="pescetarian" onChange={handleDietbox} checked={listDiet.includes("pescetarian")}/> Pescetarian{"    "}</div>
            </div>
            <div>
              <div><input type="checkbox" value="gluten" onChange={handleIntolerances} checked={listIntolerances.includes("gluten")}/> Gluten free {"    "}</div>
              <div><input type="checkbox" value="dairy" onChange={handleIntolerances} checked={listIntolerances.includes("dairy")}/> Lacto-intolerant {"    "}</div>
              <div><input type="checkbox" value="peanut,tree nut" onChange={handleIntolerances} checked={listIntolerances.includes("peanut,tree nut")}/> Without peanuts{"    "}</div>
            </div>
          </div>
        }
      </div>
    )
}