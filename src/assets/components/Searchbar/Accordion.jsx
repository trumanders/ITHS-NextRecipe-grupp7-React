import React, {useRef, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import listenForOutsideClicks from './listenForOutsideClicks';

export default function CustomAccordion({setlistType, handleDietbox, handleIntolerances}){
    const [isAccordionVisible, setIsAccodionVisible] = useState(false)
    const menuRef = useRef(null)
    const [listening, setListening] = useState(false)

    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsAccodionVisible))

    const toggle = (isAccordionVisible) => {
        return setIsAccodionVisible(!isAccordionVisible)
      }

    return (
        <div className='accordion-style' ref={menuRef}>
              <Button type='button' onClick={() => {toggle(isAccordionVisible)}}>Advanced search</Button>
              {isAccordionVisible &&

              <div className="smallText">
                <div>
              <div><input type="radio" name="type" value="breakfast" onChange={event =>setlistType(event.target.value)} /> Breakfast {"    "}</div>
              <div><input type="radio" name="type" value="lunch" onChange={event =>setlistType(event.target.value)} /> Lunch {"    "}</div>
              <div><input type="radio" name="type" value="dinner" onChange={event =>setlistType(event.target.value)} /> Dinner </div>
              </div>
            <div className='diet-boxes'>
            <div><input type="checkbox" value="vegetarian" onChange={handleDietbox} /> Vegetarian{"    "}</div>
            <div><input type="checkbox" value="vegan" onChange={handleDietbox} /> Vegan{"    "}</div>
            <div><input type="checkbox" value="pescetarian" onChange={handleDietbox} /> Pescetarian{"    "}</div>
            </div>
            <div>
            <div><input type="checkbox" value="gluten" onChange={handleIntolerances} /> Gluten free {"    "}</div>
            <div><input type="checkbox" value="dairy" onChange={handleIntolerances} /> Lacto-intolerant {"    "}</div>
            <div><input type="checkbox" value="peanut,tree nut" onChange={handleIntolerances} /> Without peanuts{"    "}</div>
            </div>
            </div>}
            </div>
    )
}