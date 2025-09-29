import React, { useCallback, useReducer } from "react";

// Esta función toma todos los inputs de un form, consulta si están todos validados y de acuerdo a eso determina la validez del formulario en general
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      // Para cada input dentro del state:
      for (const inputId in state.inputs) {
        // cuando asignamos name: undefined en Auth.js al cambiar de login a signup, la propiedad state.inputs[inputId].isValid no existe, por lo que arroja error si hacemos el cambio de login a signup. Por esto hacemos este if, para no ejecutar la lógica en caso que alguno de los inputs sea undefined
        if (!state.inputs[inputId]) {
          continue;
        }
        // Si inputId es el que se encuentra siendo tipeado actualmente, reciba el resultado de la validación y multipliquelo con el estado de validación general del formulario. Si la validación de este input es falsa, el formulario quedará con validación falsa.
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          // Para los demás inputs que no están siendo tipeados, multiplique el valor de validación general del formulario por el estado actual de validaciópn de cada uno de estos inputs que no están siendo tipeados
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      // Se actualizan los valores value e isValid en cada input, y el estado de validación general del formulario
      return {
        // Hacemos una copia del state actual
        ...state,
        inputs: {
          // Hacemos una copia de los inputs actuales del state
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    // se actualizan los datos generales del formulario mediante datos pasados en el parámetro action
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  // Le pasamos al useReducer() la función reductora y el state inicial, y obtenemos el estado actualizado y la función dispatch.
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // Esta función se le pasa como propiedad a Input, y allí se le pasan los parámetros (id, value, isValid)
  // Al estar dentro de un componente, esta función se va a crear nuevamente cada vez que el componente se renderice. Como le estamos pasando esta función como dependencia a un useEffect() en el componente hijo Input, ese useEffect() se activará cada vez que NewPlace se renderice ya que la función inputHandler se estará creando nuevamente. Esto hará que el código caiga en un loop infinito. Por esta razón se usa useCallback(), que lo que hace es crear una copia de esa función y reutilizarla para cada render del componente, evitando que se cree una nueva versión de la función en cada render y evitando que se active el useEffect de manera indeseada.
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  // función para setear los datos de los inputs del formulario
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
