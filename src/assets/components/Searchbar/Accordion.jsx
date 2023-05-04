import React, {useRef, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import listenForOutsideClicks from './listenForOutsideClicks';
import './Accordion.css';

const allMealTypes = [
    { name: "breakfast" },
    { name: "lunch" },
    { name: "dinner" },
]
const allIntolerances = [
    { name: "gluten", checked: false },
    { name: "dairy", checked: false },
    { name: "egg", checked: false },
]
const allDiets = [
    { name: "vegetarian", checked: false },
    { name: "vegan", checked: false },
    { name: "pescatarian", checked: false },
]

export const Checkbox = ({ value, type, isChecked, label, checkHandler, index}) => {
    return (
        <div>
          <input
            value={value}
            type={type}
            id={`${type}-${index}`}
            checked={isChecked}
            onChange={checkHandler}
          />
          <label htmlFor={`${type}-${index}`}>{label}</label>
        </div>
    )
}

export default function CustomAccordion({listType, setlistType, listDiet, setlistDiet, listIntolerances, setlistIntolerances}){
    const [isAccordionVisible, setIsAccodionVisible] = useState(false)
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)

    // const updateCheckStatusInt = index => {
    //     setIntolerances(
    //       intolerances.map((intolerance, currentIndex) =>
    //         currentIndex === index
    //           ? { ...intolerance, checked: !intolerance.checked }
    //           : intolerance
    //       )
    //     )
    // }

    // const updateCheckStatusDiet = index => {
    //     setDiets(
    //       diets.map((diet, currentIndex) =>
    //         currentIndex === index
    //           ? { ...diet, checked: !diet.checked }
    //           : diet
    //       )
    //     )
    // }

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

    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsAccodionVisible))

    const toggle = (isAccordionVisible) => {
        return setIsAccodionVisible(!isAccordionVisible)
      }

    return (
        <div className='accordion-style' ref={menuRef}>
              <Button className="adv-button" type='button' onClick={() => {toggle(isAccordionVisible)}}>Advanced search</Button>
              {isAccordionVisible &&

              <div className="smallText">
                <div>
              <div><input type="radio" name="type" value="breakfast" onChange={event =>setlistType(event.target.value)} checked={listType === "breakfast"}/> Breakfast {"    "}</div>
              <div><input type="radio" name="type" value="lunch" onChange={event =>setlistType(event.target.value)} checked={listType === "lunch"} /> Lunch {"    "}</div>
              <div><input type="radio" name="type" value="dinner" onChange={event =>setlistType(event.target.value)} checked={listType === "dinner"} /> Dinner </div>
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