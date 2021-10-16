import React, { useState } from "react";
import axios from "axios";
import validate from 'validator';
import ".././FormRegistrationUser/FormRegistrationUser.css";

const FormRegistrationBuisness = () => {
 
  const [BNameReg, setBNameReg] = useState("");
  const [BActivitieReg, setBActivitieReg] = useState("");
  const [bNameContatcReg, setbNameContatcReg] = useState("");
  const [BNbrEmployeReg, setBNbrEmployeReg] = useState("");
  const [BAdressReg, setBAdressReg] = useState("");
  const [BPostalCodeReg, setBPostalCodeReg] = useState("");
  const [BCityReg, setBCityReg] = useState("");
  const [BEmailReg, setBEmailReg] = useState("");
  const [BPhoneReg, setBPhoneReg] = useState("");
  const [BSiretReg, setBSiretReg] = useState("");
  const [BPasswordReg, setBPasswordReg] = useState("");
  const [BConfPassewordReg, setBConfPassewordReg] = useState("");

  const register_buis = () => {
    if(BPasswordReg !== BConfPassewordReg)  {
      alert('password must be identic');
    }
    else if(!validate.isEmail(BEmailReg)) {
      alert('warning email invalid');
    }
    else
      axios.post("http://localhost:8082/register_buis", {
        name: BNameReg,
        activities: BActivitieReg,
        contact_name: bNameContatcReg,
        number_employes: BNbrEmployeReg,
        adress: BAdressReg,
        postal_code: BPostalCodeReg,
        city: BCityReg,
        email: BEmailReg,
        phone: BPhoneReg,
        siret: BSiretReg,
        password: BPasswordReg,
        confPasseword: BConfPassewordReg,
        })
        .then((response) => {
          console.log(response);
        });
  };

  return (
    <div id="registrationBuis">
      <div id="form_registrationBuis">
        <label>
          <b>Name</b>
        </label>
        <input
          type="text" onChange={(e) => {setBNameReg(e.target.value); }}
          placeholder="Enter Name of your buisness" name="name" required
        />
        <label>
          <b>Activities</b>
        </label>
        <input
          type="text" onChange={(e) => {setBActivitieReg(e.target.value);}}
          placeholder="Enter your activite" name="activities" required
        />
        <label>
          <b>Name of contact</b>
        </label>
        <input
          type="text" onChange={(e) => {setbNameContatcReg(e.target.value); }}
          placeholder="Enter Name of contact" name="contact_name"
        />
         <label>
          <b>Number employes</b>
        </label>
        <input
          type="number" onChange={(e) => {setBNbrEmployeReg(e.target.value); }}
          placeholder="Enter number of your employes" name="number_employes"
        />
        <label>
          <b>Adress</b>
        </label>
        <input
          type="text" onChange={(e) => {setBAdressReg(e.target.value);}}
          placeholder="Enter your adress" name="adress" required
        />
        <label>
          <b>Postal code</b>
        </label>
        <input
          type="numeric" onChange={(e) => {setBPostalCodeReg(e.target.value);}}
          inputmode="numeric" maxlength="5"
          placeholder="Enter your postal code" name="postal_code" required
        />
        <label>
          <b>City</b>
        </label>
        <input
          type="text" onChange={(e) => {setBCityReg(e.target.value); }}
          placeholder="Enter your city" name="city" required
        />
        <label>
          <b>Email</b>
        </label>
        <input 
          type="email" onChange={(e) => {setBEmailReg(e.target.value);}}
          placeholder="Enter your email contact" name="email" required
        />
        <label>
          <b>Phone</b>
        </label>
        <input
          type="numeric" onChange={(e) => {setBPhoneReg(e.target.value);}}
          placeholder="Enter your phone number" name="phone" 
        />
         <label>
          <b>Siret</b>
        </label>
        <input
          type="numeric" onChange={(e) => {setBSiretReg(e.target.value); }}
          placeholder="Enter your siret" name="siret" required
        />
        <label>
          <b>Password</b>
        </label>
        <input
          type="password" onChange={(e) => {setBPasswordReg(e.target.value);}}
          name="password" required
        />
        <label>
          {" "}
          <b>Confirm your password</b>
        </label>
        <input type="password" onChange={(e) => {setBConfPassewordReg(e.target.value); }} 
        name="confPasseword" required
        />
        <button className="button_form" onClick={e =>register_buis()} id="submit_register_buis" value="register"
        >Register</button>
      </div>
    </div>
  );
};

export default FormRegistrationBuisness;
