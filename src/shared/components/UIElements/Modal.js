import React, { useRef } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

// componente que permite mostrar el mapa en un Portal
// el ModalOverlay se pasará como children el componente Modal, y recibirá todas las props de Modal, incluso los children que reciba Modal
const ModalOverlay = (props) => {
  const content = (
    <div
      ref={props.ref}
      className={`modal ${props.className}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        {/* En el componente PlaceItem, al componente Modal se le pasa el componente Map como children, por lo cual lo termina recibiendo el componente ModalOverlay a través de la siguiente instrucción */}
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  const nodeRef = useRef(null); // No se dice en el curso, lo implementé con ChatGPT
  return (
    <React.Fragment>
      {/* Si show=true, se muestra el Backdrop y el Modal */}
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames={"modal"}
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef} // Solución ChatGPT
      >
        <ModalOverlay {...props} ref={nodeRef} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
