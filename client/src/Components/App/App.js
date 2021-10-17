import React from "react";
import "./App.css";
import Home from "../Home/Home";
import PageRegistrationUser from "../PageRegistrationUser/PageRegistrationUser";
import UserAccount from "../UserAccount/UserAccount";
import Header from "../Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRegistrationBuisness from "../PageRegistrationBuisness/PageRegistrationBuisness";
import PageLogin from "../PageLogin/PageLogin";
import SuperAdmin from "../SuperAdmin/SuperAdmin";
import PageLoginBuisness from "../PageLoginBuisness/PageLoginBuisness";
import BuisnessAccount from "../BuisnessAccount/BuisnessAccount";
import PageLoginAdmin from "../PageLoginAdmin/PageLoginAdmin";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/PageLogin" exact component={PageLogin} />
        <Route path="/UserAccount/:id" exact component={UserAccount} />
        <Route path="/PageLoginBuisness" component={PageLoginBuisness} />
        <Route path="/BuisnessAccount/:id" exact component={BuisnessAccount} />
        <Route path="/PageLoginAdmin/" component={PageLoginAdmin} />
        <Route path="/SuperAdmin/" component={SuperAdmin} />
        <Route
          path="/PageRegistrationUser"
          exact
          component={PageRegistrationUser}
        />
        <Route
          path="/PageRegistrationBuisness"
          exact
          component={PageRegistrationBuisness}
        />
      </Router>
    </div>
  );
}

export default App;
