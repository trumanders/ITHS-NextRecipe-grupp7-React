import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./RecipeCard.css";
import { Link } from "react-router-dom";

function RecipeCard({ id, image, title }) {
  return (
    <div className="card-container">
      <Card key={id} style={{ width: "20rem" }} className="card-Card">
        <Card.Img variant="top" src={image} className="card-image" />
        <Card.Body>
          <Card.Title className="card-title">{title}</Card.Title>
          {/* <Card.Text className='card-text'>
         Servings: {servings}
         <br/>
         Ready in minutes: {readyInMinutes}
        </Card.Text> */}
          <Link to={`/recipe/${id}`} className="card-button">
            View Recipe
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeCard;
