import React from "react";
import { Link, withRouter } from "react-router-dom";
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

const Menu = ({ history }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
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
    history.go(0);
  };

  const { user: { fio } = {} } = isAuthenticated();

  return (
    <nav className="navbar navbar-collapse-md bg-primary text-white">
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            <House /> Главная
          </Link>
        </li>

        {!isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/login"
            >
              <BoxArrowInDownLeft /> Вход
            </Link>
          </li>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  history.push("/login");
                })
              }
            >
              <BoxArrowUpRight /> Выход
            </span>
          </li>
        )}


      </ul>
      {isAuthenticated() ? (
        <div className="nav-item">      
          <Person /> {fio}
        </div>
      ):
      (<button className="btn btn-primary btn-sm m-0" onClick={toggleServer}>  
         {(getServer().servType || "ext")==="ext" ?<Globe />:<Wifi />}
      </button>)}
    </nav>
  );
};

export default withRouter(Menu);
