import Card from "react-bootstrap/Card";
import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";
import defaultFood from "../../pictures/defaultFood.jpeg";

function RecipeCard({ id, image, title, usedIngredientCount, missedIngredientCount }) {
  const navigate = useNavigate();
  function clickHandler() {
    navigate(`/recipe/${id}`);

  }
  return (
    <button onClick={clickHandler}>
      {/* <div className="card-container"> */}
      <Card className="card" key={id}>
        <Card.Body className={usedIngredientCount ? "card-body-large" : "card-body"} style={{ padding: "0" }}>
          <Card.Img
            variant="top"
            src={(image === null || image === undefined) ? defaultFood : image}
            className="card-image"
            style={{ padding: "0" }}
          />
          <Card.Title className="card-title">{title.length > 65 ? title.substr(0, 50).concat("...") : title}</Card.Title>
          {usedIngredientCount !== undefined &&
          <Card.Text className='card-text'>
       Used Ingredients: {usedIngredientCount}
       <br/>
       Missing Ingredients: {missedIngredientCount}
      </Card.Text>}
        </Card.Body>
      </Card>
      {/* </div> */}
    </button>
  );
}

export default RecipeCard;
