import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import './Search.css';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Accordion from 'react-bootstrap/Accordion';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

function Search() {
    const[input, setInput] = useState("")
    const[listInputs, setlistInputs] = useState([])
    const[recipeSearch, setrecipeSearch] = useState("")
    const[listDiet, setlistDiet] = useState([])
    const[listType, setlistType] = useState()
    const[listIntolerances, setlistIntolerances] = useState([])
    

    const handleSubmit=(event)=> {
      // Gör att browsern ej refreshar utan stannar på sidan
      event.preventDefault();
      const item=[input]
      if(input)
      {
        setlistInputs((ls) =>[...ls, item])
        setInput("")
        
      }
      
    }

    const deleteInput = value => {
      setlistInputs(oldValues => {
        
        return oldValues.filter(item => item !== value)
        
      })
    }
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
      
      const handleRecipeSearch = (event) =>{
        event.preventDefault();
        const recipeItem = (recipeSearch)
        setrecipeSearch(recipeItem)
        console.log(recipeSearch)
      }

      const sendIngridients = () => {
        console.log(listType)
        console.log(listInputs.toString())
        console.log(listDiet.toString())
        console.log(listIntolerances.toString())
      }

  return (
    
    <Tabs
      defaultActiveKey="profile"
      id="searchtabs"
      className="mb-3"
    >
      
      <Tab eventKey="take-what-you-have" title="Take what you have">
        <p>Add your ingridients in the box below, we will fix the rest.</p>

        <input type="radio" name="type" value="breakfast" onChange={event =>setlistType(event.target.value)} /> Breakfast {"    "}
        <input type="radio" name="type" value="lunch" onChange={event =>setlistType(event.target.value)} /> Lunch {"    "}
        <input type="radio" name="type" value="dinner" onChange={event =>setlistType(event.target.value)} /> Dinner 

        <form onSubmit={handleSubmit} className="search-form">
            <input type="text" placeholder="Add your ingridients" value={input} name="tab1" className="seach-input" onChange={(event)=>setInput(event.target.value)}/>
            <Button variant="dark" type="button" onClick={handleSubmit}>Add</Button>
            
            <Accordion className="accordion-style">
            <Accordion.Item eventKey="0">
            <Accordion.Header>Advanced search</Accordion.Header>
            <Accordion.Body>
            <div className="diet-boxes">
            <input type="checkbox" value="vegetarian" onChange={handleDietbox} /> Vegetarian{"    "}
            <input type="checkbox" value="vegan" onChange={handleDietbox} /> Vegan{"    "}
            <input type="checkbox" value="pescetarian" onChange={handleDietbox} /> Pescetarian{"    "}
            </div>
            <div>
            <input type="checkbox" value="gluten" onChange={handleIntolerances} /> Gluten free {"    "}
            <input type="checkbox" value="dairy" onChange={handleIntolerances} /> Lacto-intolerant {"    "}
            <input type="checkbox" value="peanut,tree nut" onChange={handleIntolerances} /> Without peanuts{"    "}
            </div>
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </form>
  
        {
          listInputs.map(item => {
            return (
          <li key={item}>
            <span>{item} {"  "}</span>
            <CloseButton type="Button" onClick={() => deleteInput(item)}></CloseButton>
            </li>
            )
          })}
          
        <Button onClick={sendIngridients} variant="outline-dark">Search</Button>
      </Tab>
      <Tab eventKey="home" title="Recepies">
      <p>Search a recipe</p>
      
        <form onSubmit={handleRecipeSearch} className="search">
        <div>
        <input type="text" placeholder="Recipe" value={recipeSearch} name="tab2" className="search-recipe" onChange={(event)=>setrecipeSearch(event.target.value)}/>
            
            </div>
            <Button variant="outline-dark" type="Button" onClick={handleRecipeSearch}>Search</Button>
 
        </form>
      
      </Tab>

      <Tab eventKey="contact" title="Random recipe">
        <p>Use our randomizer when you have a hard time coming up with ideas.</p>
        <div>
        <input type="radio" name="type" value="breakfast" onChange={event =>setlistType(event.target.value)} /> Breakfast {"    "}
        <input type="radio" name="type" value="lunch" onChange={event =>setlistType(event.target.value)} /> Lunch {"    "}
        <input type="radio" name="type" value="dinner" onChange={event =>setlistType(event.target.value)} /> Dinner 
        </div>  
        <hr></hr>

        <Accordion className="accordion-style">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Advanced search</Accordion.Header>
        <Accordion.Body>
        <div className="diet-boxes">
            <input type="checkbox" value="vegetarian" onChange={handleDietbox} /> Vegetarian{"    "}
            <input type="checkbox" value="vegan" onChange={handleDietbox} /> Vegan{"    "}
            <input type="checkbox" value="pescetarian" onChange={handleDietbox} /> Pescetarian{"    "}
            </div>
            <div>
            <input type="checkbox" value="gluten" onChange={handleIntolerances} /> Gluten free {"    "}
            <input type="checkbox" value="dairy" onChange={handleIntolerances} /> Lacto-intolerant {"    "}
            <input type="checkbox" value="peanut,tree nut" onChange={handleIntolerances} /> Without peanuts{"    "}
            </div>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>

        <Button variant="outline-dark" onClick={sendIngridients}type="Button">Go!</Button>
        
      </Tab>
    </Tabs>

          
    
  );
};

export default Search;
