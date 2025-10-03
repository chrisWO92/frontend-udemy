import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input.js";
import Button from "../../shared/components/FormElements/Button.js";
import { useHttpCLient } from "../../shared/hooks/http-hook.js";
import "./PlaceForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators.js";
import { useForm } from "../../shared/hooks/form-hook.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";
import { useHistory } from "react-router-dom";

// componente para agregar un nuevo lugar
const NewPlace = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const { isLoading, error, sendRequest, clearError } = useHttpCLient();
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
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
};

export default NewPlace;
