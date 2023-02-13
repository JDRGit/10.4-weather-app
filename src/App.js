import React from "react";
import Weather from "./components/Weather";
import Quote from "./components/Quote";
import Music from "./components/Music";
import "./App.css";

const App = () => {
  return (
    <div className="header-container">
      <h1 className="header-message">Welcome to Jaime's Weather App</h1>
      <Weather />
      <Quote />
      <Music />
    </div>
  );
};

export default App;
