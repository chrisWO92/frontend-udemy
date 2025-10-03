import { createContext } from "react";

// creamos el context que permitirá compartir en varios lugares de la aplicación, los datos relacionados a la autenticación de usuario y así poder modificar la interfaz de acuerdo a si el usuario se encuentra logeado o no
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
