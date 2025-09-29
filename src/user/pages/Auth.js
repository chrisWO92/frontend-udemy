import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators.js";
import Input from "../../shared/components/FormElements/Input.js";
import Button from "../../shared/components/FormElements/Button.js";
import { useForm } from "../../shared/hooks/form-hook.js";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";

// otra de las páginas que se mostrará en la aplicación, la página de autenticación de usuario, asociado a usuarios
const Auth = () => {
  const history = useHistory();

  // invocamos el contexto que comparte datos a través de la aplicación
  const auth = useContext(AuthContext);

  // estado parad determinar si estamos haciendo login o no, si estamos haciendo sign up, no estamos en modo login
  const [isLoginMode, setIsLoginMode] = useState(true);

  // para verificar si está cargando
  const [isLoading, setIsLoading] = useState(false);

  // para verificar si hay algún error
  const [error, setError] = useState(false);

  // hacemos  uso del hook creado por nosotros con los valores iniciales que queremos que tengan los inputs
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // se invierte el valor de isLoginMode
  const switchModeHandler = () => {
    // si isLoginMode = false quiere decir que se está cambiando de signup a login, por tanto, antes de cambiar a login, entraría al siguiente if y setearía name: undefined y no lo mostraría en el formulario.
    // al setearlo como undefined habría un error al intentar ingresar a la propiedad isValid del input name, pues no existe, por lo que se agrega un if en useForm() que corrija este bug.
    if (!isLoginMode) {
      setFormData(
        {
          // copiamos todos los valores actuales para no perder ningún dato
          ...formState.inputs,
          // sobreescribimos el input 'name'
          name: undefined,
        },
        // definimos el estado de validación general del formulario a través de la validez de los inputs disponibles
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          // copiamos todos los valores actuales para no perder ningún dato
          ...formState.inputs,
          // sobreescribimos el input 'name'
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    // cambiamos el modo login
    setIsLoginMode((prevMode) => !prevMode);
  };

  // función asociada al botón de submit del formulario de autenticación
  // cuando se clickea, se ejecuta la función login que proviene del contexto
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    // Conexión del método authSubmitHandler con el backend
    /* 
      Usamos un fetch para enviar una request a la ruta encargada
      de hacer el signup de usuarios.
      Pasamos name, email, password porque es lo que el backend
      nos pide para poder hacer el signup.
      Si estamos en login mode, hacemos una acción, y si no, 
      hacemos otra.
    */

    // apenas intente hacer el fetch, se cambia el estado isLoading a true
    // para que muestre el estado de carga en el frontend
    setIsLoading(true);

    if (isLoginMode) {
      try {
        // se hace el fetch
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
        history.push("/");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        // se hace el fetch
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
        history.push("/");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again.");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication padding-1rem">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        {/* 
        El formulario renderiza ciertos componentes dependiendo del estado isLoginMode
      */}
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          {/* Cuando el formulario no es válido, el botón deberá estar deshabilitado */}
          {formState.isValid && (
            <Button disabled={!formState.isValid} onClick={authSubmitHandler}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          )}
          {!formState.isValid && (
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          )}
          {/* <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button> */}
        </form>
        {/* Botón para cambiar de modo login a modo signup y viceversa */}
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
