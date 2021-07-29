import React from "react";
import "./App.css";
import Tab from "./components/Tab";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h2>Select Builder Schedule - 2019 Fall Cohort</h2>
      </div>
      <Tab />
      <div className="buttons">
        <button>cancel</button>
        <button>use this builder schedule</button>
      </div>
    </div>
  );
}

export default App;
