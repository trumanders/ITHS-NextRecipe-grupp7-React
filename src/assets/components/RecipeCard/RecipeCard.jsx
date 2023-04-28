import Card from "react-bootstrap/Card";
import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";
import defaultFood from "../../pictures/defaultFood.jpeg";

function RecipeCard({ id, image, title }) {
  const navigate = useNavigate();
  function clickHandler() {
    navigate(`/recipe/${id}`);
  }
  return (
    <button onClick={clickHandler}>
      {/* <div className="card-container"> */}
      <Card className="card" key={id}>
        <Card.Body className="card-body" style={{ padding: "0" }}>
          <Card.Img
            variant="top"
            src={image !== null ? image : defaultFood}
            className="card-image"
            style={{ padding: "0" }}
          />
          <Card.Title className="card-title">{title}</Card.Title>
          {/* <Card.Text className='card-text'>
       Servings: {servings}
       <br/>
       Ready in minutes: {readyInMinutes}
      </Card.Text> */}
        </Card.Body>
      </Card>
      {/* </div> */}
    </button>
  );
}

export default RecipeCard;
