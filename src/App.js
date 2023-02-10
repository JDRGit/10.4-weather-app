import React from "react";
import Weather from "./components/Weather";
import Music from "./components/Music";
import "./App.css";

const App = () => {
  return (
    <div className="header-container">
      <h1 className="header-message">Welcome to Jaime's Weather App</h1>
      <Weather />
      <Music />
    </div>
  );
};

export default App;
