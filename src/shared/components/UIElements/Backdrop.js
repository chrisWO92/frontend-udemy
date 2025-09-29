import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

// este componente se renderiza en un portal
const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
