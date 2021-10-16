import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import PageRegistrationUser from "../PageRegistrationUser/PageRegistrationUser";
import PageRegistrationBuisness from "../PageRegistrationBuisness/PageRegistrationBuisness";
import PageLogin from "../PageLogin/PageLogin";
import UserAccount from "../UserAccount/UserAccount";
import SuperAdmin from "../SuperAdmin/SuperAdmin";
import logo from "../../images/logo_small_blue.png";
import PageLoginBuisness from "../PageLoginBuisness/PageLoginBuisness";

const Header = () => {
  return (
    <header id="header">
      <ul className="div_button">
        {/* Lien page accueil*/}
        <Link
          to={{
            pathname: "/",
            search: "?sort=name",
            hash: "#the-hash",
            state: { fromDashboard: true },
          }}
        >
          <li to="/">
            <button> Home</button>
          </li>
        </Link>
        {/* Lien page login*/}
        <Link
          to={{
            pathname: "/PageLogin",
            search: "?sort=name",
            hash: "#the-hash",
            state: { fromDashboard: true },
          }}
        >
          <li to="/PageLogin" Components={PageLogin}>
            <button>User Account</button>
          </li>
        </Link>

        {/* Lien page acountBuisiness*/}
        <Link
          to={{
            pathname: "/PageLoginBuisness",
            search: "?sort=name",
            hash: "#the-hash",
            state: { fromDashboard: true },
          }}
        >
          <li to="/PageLoginBuisness" Components={PageLoginBuisness}>
            <button>Buisness Account</button>
          </li>
        </Link>
        {/* Lien page super admin*/}
        <Link
          to={{
            pathname: "/SuperAdmin",
            search: "?sort=name",
            hash: "#the-hash",
            state: { fromDashboard: true },
          }}
        >
          <div to="/SuperAdmin" Components={SuperAdmin} />
          <button>Super Admin</button>
        </Link>
      </ul>
      <h1>
        Find Job <img src={logo} alt="logo" />{" "}
      </h1>
      <div id="center_header">
        <h2>Find the right job for you.</h2>
        {/* Lien page inscription user*/}
        <div>
          <Link
            to={{
              pathname: "/PageRegistrationUser",
              search: "?sort=name",
              hash: "#the-hash",
              state: { fromDashboard: true },
            }}
          >
            <div to="/PageRegistrationUser" Components={PageRegistrationUser} />
            <button>Register User</button>
          </Link>
          {/* Lien page inscription buisness*/}
          <Link
            to={{
              pathname: "/PageRegistrationBuisness",
              search: "?sort=name",
              hash: "#the-hash",
              state: { fromDashboard: true },
            }}
          >
            <div
              to="/PageRegistrationBuisness"
              Components={PageRegistrationBuisness}
            />
            <button>Register Buisness</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
