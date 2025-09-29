import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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

// renderiza todos los lugares asociados al usuario
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
