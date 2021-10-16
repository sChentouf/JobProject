import React, { useState, useEffect } from "react";
import axios from "axios";
//import validate from "validator";
import jwt from "jsonwebtoken";
import ".././FormRegistrationUser/FormRegistrationUser.css";

const FormApply = (props) => {
  const [userData, setUserData] = useState({
    name: "",
    first_name: "",
    email: "",
    phone: "",
    motivation_people: "",
  });
  const [motivationApl, setMotivationApl] = useState("");
  const [idAdv] = useState(props.idAdv);

  useEffect(() => {
    const localtoken = localStorage.getItem("myJWT");
    const decoded = jwt.verify(localtoken, "secret");
    axios
      .get("http://localhost:8082/candidate/" + decoded.id)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setUserData(response.data);
        }
      });
  }, [props]);
  console.log("response");

  const goApplyUserCo = (props) => {
    const localtoken = localStorage.getItem("myJWT");
    const decoded = jwt.verify(localtoken, "secret");
    console.log("le miiiiiiiiiiiiiien " + decoded.id);
    axios
      .post("http://localhost:8082/applieduser" + decoded.id, {
        // name: userData.name,
        // first_name: userData.first_name,
        // email: userData.email,
        // phone: userData.phone,
        motivation_people: motivationApl,
        idAdv: idAdv,
        id: decoded.id,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div id="apply">
      <form id="Form_apply">
        <button>X</button>
        <br />
        <label>
          <b>Name</b>
        </label>
        <input
          type="text"
          value={userData.name}
          placeholder="Enter your Name"
          name="name"
          required
        />
        <label>
          <b>FirstName</b>
        </label>
        <input
          type="text"
          value={userData.first_name}
          placeholder="Enter your FirstName"
          name="FirstName"
          required
        />
        <label>
          <b>Email</b>
        </label>
        <input
          type="email"
          value={userData.email}
          placeholder="Enter your email"
          name="email"
          required
        />
        <label>
          <b>Phone</b>
        </label>
        <input
          type="tel"
          value={userData.phone}
          placeholder="Enter your phone number"
          name="phone"
        />

        <label>
          <b>Your motivation</b>
        </label>
        <input
          type="textarea"
          onChange={(e) => {
            setMotivationApl(e.target.value);
          }}
          placeholder="Talk about your motivation"
          name="text_motivation"
        />
        <button
          className="button_form"
          onClick={(e) => goApplyUserCo()}
          id="submit_apply"
          value="apply"
        >
          Post Apply
        </button>
      </form>
    </div>
  );
};

export default FormApply;
