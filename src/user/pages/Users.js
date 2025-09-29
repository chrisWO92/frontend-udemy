import React from "react";
import UsersList from "../components/UsersList";

// Esta es una de las páginas que se mostrará en la aplicación asociadas a usuarios
const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://thumbs.dreamstime.com/z/music-music-musical-design-background-radio-listen-song-118949806.jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
