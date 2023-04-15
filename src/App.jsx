import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeRepresentation from "./assets/RecipeRepresentation";

function App() {
  return (
    <div>
      <Layout />;
      <RecipeRepresentation/>;
    </div>
  );
}

export default App;
