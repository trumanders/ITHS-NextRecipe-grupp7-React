import Card from "react-bootstrap/Card";
import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";

function RecipeCard({ id, image, title }) {
  const navigate = useNavigate();
  function clickHandler() {
    navigate(`/recipe/${id}`);
  }

  return (
    <button onClick={clickHandler}>
      <div className="card-container">
        <Card key={id} style={{ width: "20rem" }}>
          <Card.Img variant="top" src={image} className="card-image" />
          <Card.Body>
            <Card.Title className="card-title">{title}</Card.Title>
            {/* <Card.Text className='card-text'>
         Servings: {servings}
         <br/>
         Ready in minutes: {readyInMinutes}
        </Card.Text> */}
          </Card.Body>
        </Card>
      </div>
    </button>
  );
}

export default RecipeCard;
