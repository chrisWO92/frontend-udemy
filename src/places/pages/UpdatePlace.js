import React, { useEffect, useState } from "react";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card.js";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageURL:
      "https://previews.123rf.com/images/tassev/tassev1612/tassev161200015/68869707-high-building-sky-with-clouds.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9882447,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building 2",
    description: "One of the most famous sky scrapers in the world!",
    imageURL:
      "https://previews.123rf.com/images/tassev/tassev1612/tassev161200015/68869707-high-building-sky-with-clouds.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9882447,
    },
    creator: "u2",
  },
];

// componente para actualizar información de un componente
const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  // capturamos el id de la ruta mediante useParams()
  const placeId = useParams().placeId;

  // encontramos el place asociado a ese id en la base de datos
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  // invocamos useForm() y traemos setFormData en esta ocasión
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  // si no lo encuentra, mande un mensaje de alerta
  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card className="padding-1rem">
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Función para enviar datos al backend. Se arreglará más adelante, por el momento sólo hará un console.log()
  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
