import React, { useState } from "react";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
  // estado que permite definir si se muestra el menú móbil o el web
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {/* Si drawerIsOpen = true renderizar el componente Backdrop, que es el fondo oscuro que aparece cuando se renderiza el SideDrawer (Modal) */}
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      {/* Si drawerIsOpen = true la propiedad 'show' hará que se muestre el SideDrawer con los NavLinks*/}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      {/* 
        Si estamos en pantalla mobil el menú web desaparece y aparece el ícono hamburguesa. Esto se ejecuta mediante CSS.      
      */}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
