import React from "react";
import "./Card.css";

// componente que permite darle estilo carta a cualquier componente de nuestra aplicación
const Card = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
