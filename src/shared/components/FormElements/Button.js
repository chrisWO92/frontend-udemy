import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

// componente botón con funcionalidades especiales
const Button = (props) => {
  // si le pasamos la propiedad href, se renderiza de esta forma
  // el estilo del botón depende de las propiedades que le pasemos
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  // si no le pasamos 'href' sino 'to', se renderiza de esta otra forma usando Link
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        disabled={props.disabled}
        onClick={props.onClick}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  // si no tiene ninguna de las anteriores, renderizar de esta forma
  // aquí se usa la propiedad disabled para habilitar o deshabilitar el clickeado dependiendo de la validación del formulario
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
