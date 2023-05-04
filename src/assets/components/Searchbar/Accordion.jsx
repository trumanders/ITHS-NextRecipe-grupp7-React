import React, {useRef, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import listenForOutsideClicks from './listenForOutsideClicks';
// import { removeListenForOutsideClicks } from './listenForOutsideClicks';
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

    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsAccordionVisible))

    // useEffect((setI) => {
    //     if (listening) return
    //     if (!menuRef.current) return
    //     setListening(true)
    //     ;[`click`, `touchstart`].forEach((type) => {
    //       document.addEventListener(`click`, (evt) => {
    //         const cur = menuRef.current
    //         const node = evt.target
    //         if (cur === null || cur.contains(node)) return
    //         setIsAccordionVisible(false)
    //       })
    //     })
    //     return removeEventListener('click', setListening(false))
    //   })

    const toggle = (isAccordionVisible) => {
        return setIsAccordionVisible(!isAccordionVisible)
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