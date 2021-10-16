import React, { useState } from "react";
import axios from "axios";
import validate from "validator";
import ".././FormRegistrationUser/FormRegistrationUser.css";

const FormApply = (props) => {
  const [nameApl, setNameApl] = useState("");
  const [firstNameApl, setfirstNameApl] = useState("");
  const [emailApl, setemailApl] = useState("");
  const [phoneApl, setphoneApl] = useState("");
  const [motivationApl, setMotivationApl] = useState("");
  const [idAdv] = useState(props.idAdv);

  const goApply = (props) => {
    // CREATE CANDIDAT
    if (!validate.isEmail(emailApl)) {
    } else
      axios
        .post("http://localhost:8082/applied", {
          name: nameApl,
          first_name: firstNameApl,
          email: emailApl,
          phone: phoneApl,
          motivation_people: motivationApl,
          idAdv: idAdv,
        })
        .then((response) => {
          console.log(response);
        });
  };

  return (
    <div id="apply">
      <form id="Form_apply">
        <button>X</button>
        <label>
          <b>Name</b>
        </label>
        <input
          type="text"
          onChange={(e) => {
            setNameApl(e.target.value);
          }}
          placeholder="Enter your Name"
          name="name"
          required
        />
        <label>
          <b>FirstName</b>
        </label>
        <input
          type="text"
          onChange={(e) => {
            setfirstNameApl(e.target.value);
          }}
          placeholder="Enter your FirstName"
          name="FirstName"
          required
        />
        <label>
          <b>Email</b>
        </label>
        <input
          type="email"
          onChange={(e) => {
            setemailApl(e.target.value);
          }}
          placeholder="Enter your email"
          name="email"
          required
        />
        <label>
          <b>Phone</b>
        </label>
        <input
          type="tel"
          onChange={(e) => {
            setphoneApl(e.target.value);
          }}
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
          onClick={(e) => goApply()}
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
