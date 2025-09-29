import React from "react";
import Input from "../../shared/components/FormElements/Input.js";
import Button from "../../shared/components/FormElements/Button.js";
import "./PlaceForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators.js";
import { useForm } from "../../shared/hooks/form-hook.js";

// componente para agregar un nuevo lugar
const NewPlace = () => {
  // invocamos el useForm y le pasamos los valores iniciales
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Función para enviar datos al backend. Se arreglará más adelante, por el momento sólo hará un console.log()
  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid address."
        onInput={inputHandler}
      />
      {/* Cuando el formulario no es válido, el botón deberá estar deshabilitado */}
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
