import React, { useEffect, useState } from "react";
import validate from "validator";
import "./BuisnessAccount.css";
import jwt from "jsonwebtoken";
//import logo from "../../images/logo_small_blue.png";
import axios from "axios";
import CreateAnnoucement from "../CreateAnnoucement/CreateAnnoucement";
//import BuisnessAnnoucement from "../BuisnessAnnoucement/BuisnessAnnoucement";
import BuisnessAd from "../BuisnessAd/BuisnessAd";



const BuisnessAccount = (props) => {


  
  const Delog = () => {
    localStorage.removeItem("myJWT");
    window.location.href = `/`;
  };

  const Delete = () => {
    const localtoken = localStorage.getItem("myJWT");
    const decoded = jwt.verify(localtoken, "secret");
    axios
      .delete("http://localhost:8082/buisness/" + decoded.id)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setUserData(response.data);
        }
      });
    localStorage.removeItem("myJWT");
    window.location.href = `/`;
  };

  const [userData, setUserData] = useState({
    name: "",
    activities: "",
    contact_name: "",
    number_employes: "",
    adress: "",
    postal_code: "",
    city: "",
    email: "",
    phone: "",
    siret: "",
    password: "",
  });

  //RECUPERE LES INFOS
  useEffect(() => {
    const localtoken = localStorage.getItem("myJWT");
    const decoded = jwt.verify(localtoken, "secret");
    axios
      .get("http://localhost:8082/buisness/" + decoded.id)
      .then((response) => {
        if (response.data) {
          setUserData(response.data);
        }
      });
  }, [props]);
  console.log("response");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const UpdateInfosBuisness = () => {
    if (userData.password !== userData.confirm_password) {
      alert("password must be identic");
    } else if (!validate.isEmail(userData.email)) {
      alert("warning email invalid");
    } else console.log("zeze");
    console.log(userData);
    const localtoken = localStorage.getItem("myJWT");
    const decoded = jwt.verify(localtoken, "secret");
    axios
      .post("http://localhost:8082/buisness/" + decoded.id, {
        // if(props.match.params == undefined)
        name: userData.name,
        activities: userData.activities,
        contact_name: userData.contact_name,
        number_employes: userData.number_employes,
        adress: userData.adress,
        postal_code: userData.postal_code,
        city: userData.city,
        email: userData.email,
        phone: userData.phone,
        siret: userData.siret,
        password: userData.password,
        // confirm_password:  userData.confirm_password,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const [create, setCreate] = useState(false);

  return (
    <div>
      <div id="content_user_account">
        {userData && (
          <div id="info_user">
            <h3>Informations Buisness</h3>
            <div>
              {/* if exist else defautl*/}
              {/* <img src={logo} alt="logo" />
              <button>Change pitcure</button><br /> */}
              {/* NAME */}
              <label>
                <b>Name : {userData.name}</b>
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* ACTIVITIES */}
              <label>
                <b>Activities : {userData.activities}</b>
              </label>
              <br />
              {/* CONTACT NAME */}
              <label>
                <b>Contact Name : {userData.contact_name}</b>
              </label>
              <input
                type="text"
                name="contact_name"
                value={userData.contact_name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* NUMBER EMPLOYES */}
              <label>
                <b>Number of employes : {userData.number_employes}</b>
              </label>
              <input
                type="number"
                name="number_employes"
                value={userData.number_employes}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* ADRESS*/}
              <label>
                <b>Adress : {userData.adress}</b>
              </label>
              <input
                type="text"
                name="adress"
                value={userData.adress}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* POSTAL CODE*/}
              <label>
                <b>Postal Code : {userData.postal_code}</b>
              </label>
              <input
                type="numeric"
                name="postal_code"
                value={userData.postal_code}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* CITY*/}
              <label>
                <b>City : {userData.city}</b>
              </label>
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* EMAIL */}
              <label>
                <b>Email : {userData.email}</b>
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* PHONE if exist*/}
              <label>
                <b>Phone : {userData.phone}</b>
              </label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* SIRET */}
              <label>
                <b>Siret : {userData.siret}</b>
              </label>
              <br />
              {/* PASSEWORD*/}
              <label>
                <b>Change password :</b>
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label>
                {" "}
                <b>Confirm your new password</b>
              </label>
              <input
                type="password"
                name="confirm_password"
                value={userData.confirm_password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              {/* BOUTON*/}
              <button
                className="button_form"
                onClick={(e) => UpdateInfosBuisness()}
                id="submit_change"
                value="change"
              >
                Change info
              </button>
            </div>
          </div>
        )}

        <div id="candidacy_user">
          <h3>Annoucements</h3>
          <button onClick={() => setCreate(!create)}>
            Create new Annoucement
          </button>
          {create && <CreateAnnoucement />}
          <BuisnessAd />
        </div>
      </div>
      <button onClick={(e) => Delete()}>Delete account</button>
      <button onClick={(e) => Delog()}>Logout</button>
    </div>
  );
};
export default BuisnessAccount;
