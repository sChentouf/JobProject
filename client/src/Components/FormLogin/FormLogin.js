import React, { useState } from "react";
//import reactDom from "react-dom";
import ".././FormRegistrationUser/FormRegistrationUser.css";
import axios from "axios";
import jwt from "jsonwebtoken";


const FormLogin = () => {

  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const req = () => {
    axios
      .post("http://localhost:8082/login", {
        email: emailLog,
        password: passwordLog,
      })
      .then((response) => {
        if (response.data) {
          if (response.data.message === "success") {
            try {
              console.log(response.data.token);
              const decoded = jwt.verify(response.data.token, "secret");
              localStorage.setItem("myJWT", response.data.token);
              window.location.href = `../UserAccount/${decoded.id}`;
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
  };
  return (
    <div id="login">
      <div id="form_login">
        <label>
          <b>Email</b>
        </label>
        <input
          onChange={(e) => setEmailLog(e.target.value)}
          type="email"
          placeholder="Enter your email"
          name="email"
          required
        />
        <label>
          <b>Password</b>
        </label>
        <input
          onChange={(e) => setPasswordLog(e.target.value)}
          type="password"
          placeholder="Enter your password"
          name="password_user"
          required
        />
        <button
          className="button_form"
          onClick={(e) => req()}
          id="submit_login"
          value="login"
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default FormLogin