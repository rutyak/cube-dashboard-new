import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/line">Line Chart</Link>
        </li>
        <li>
          <Link to="/bar">Bar Chart</Link>
        </li>
        <li>
          <Link to="/area">Area Chart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;
