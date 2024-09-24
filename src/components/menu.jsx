import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import {
  PersonFill,
  House,
  BoxArrowUpRight,
  BoxArrowInDownLeft,
  Person,
  Globe,
  Globe2,
  Wifi,
} from "react-bootstrap-icons";

import { setServType, getServer } from "../api/getServer";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: "#ff9900" };
    } else {
      return { color: "#ffffff" };
    }
  };

  const toggleServer = () => {
    const { servType } = getServer();
    if (servType === "ext") {
      setServType("int");
    } else {
      setServType("ext");
    }
    navigate(0);
  };

  const { user: { fio } = {} } = isAuthenticated();

  return (
    <nav className="navbar navbar-collapse-md bg-primary text-white">
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive("/")} to="/">
            <House /> Главная
          </Link>
        </li>

        {!isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive("/signin")}
              to="/login"
            >
              <BoxArrowInDownLeft /> Вход
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;