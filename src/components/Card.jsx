import React from "react";
import "../styles/card.css";
import imageCard from "../assets/images/image-card.png";

const Card = ({ item, isChecked, component }) => {
  return (
    <div className={isChecked ? "card-border" : "card"}>
      <div className="card-text">
        <h3>{item}</h3>
        <a href="#">view builder</a>
      </div>
      <div className="card-image">
        <img
          className={isChecked ? "image" : "image-gray"}
          src={imageCard}
          alt="image card"
        />
      </div>
      {component}
    </div>
  );
};

export default Card;
