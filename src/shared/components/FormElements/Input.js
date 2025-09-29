import React, { useEffect, useReducer } from "react";
import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  /* 
    El inputReducer es la función que permite actualizar el estado global del componente mediante el useReducer.
  */

  switch (action.type) {
    case "CHANGE":
      return {
        // spread operator: copia todos los valores del state anterior para no modificarlos. Sólo se modificarán los que se actualicen abajo.
        ...state,
        // se actializa "value" al valor que se le pase a la propiedad action.val en el dispatch
        value: action.val,
        // se actualiza "isValid" mediante la función validate(value, validator), que recibe la información ingresada en el campo input y hace la validación que se le pasa en el segundo argumento.
        isValid: validate(action.val, action.validators),
      };
    // esta acción cambia la variable isTouched a true cuando un input está clickeado. Esta variable se usa para la lógica de los componentes.
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // Se crea el useReducer y se le pasa el inputReducer que es la función que ejecuta un trozo de código de acuerdo a la acción enviada como parámetro, y también se le pasa el state inicial. Lo que se obtiene es el inputState que es el state actualizado y la función dispatch que es la que manda las acciones a ejecutar en inputReducer.
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  // Guardamos id, onInput, value, isValid desde props e inputState
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  // Este useEffect() hace que el componente se renderice nuevamente cuando las variables y funciones pasadas como parámetros sean actualizadas.
  // Aquí le pasamos los parámetros a la función onInput, que en realidad es inputHandler desde NewPlace.
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  // Esta función le pasa al inputReducer el valor que se está tipeando en el input y los validadores pasados como propiedad al componente desde su componente padre, en este caso NewPlace.js
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  // Activa la acción TOUCH cuando el usuario se encuentra sobre un input en particular
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  // Creamos un elemento dinámico que renderiza un tipo de input dependiendo de la propiedad 'element'
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  // el estilo del input dependerá de su validez y de si está siendo usado por el usuario
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {/* si no es válido mandamos el mensaje de error */}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
