import { useState } from "react";
import "./App.css";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [count, setCount] = useState(0);

  return <Layout />;
}

export default App;
