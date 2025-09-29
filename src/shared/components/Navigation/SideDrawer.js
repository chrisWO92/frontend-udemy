import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.css";
import { CSSTransition } from "react-transition-group";

// componente que se renderiza como menú en pantalla de mobiles
const SideDrawer = (props) => {
  const nodeRef = useRef(null); // No se dice en el curso, lo implementé con ChatGPT
  // se usa una transición
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames={"slide-in-left"}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef} // Solución ChatGPT
    >
      <aside className="side-drawer" ref={nodeRef} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  // este componente se renderiza mediante un Portal
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
