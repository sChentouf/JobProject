import React, { useState } from "react";
import axios from "axios";
import validate from 'validator';
import "./FormRegistrationUser.css";
import FileUpload from "../FileUpload/FileUpload";

const FormRegistrationUser = () => {

  
  const [nameReg, setNameReg] = useState("");
  const [firstNameReg, setfirstNameReg] = useState("");
  const [emailReg, setemailReg] = useState("");
  const [phoneReg, setphoneReg] = useState("");
  const [adressReg, setadressReg] = useState("");
  const [postalCodeReg, setpostalCodeReg] = useState("");
  const [cityReg, setcityReg] = useState("");
  const [birthDateReg, setbirthDateReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");
  const [confPassewordReg, setconfPassewordReg] = useState("");
  const [genderReg, setgenderReg] = useState("");
  // const [name, setName] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  

  // const submitForm = () => {
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("file", selectedFile);
  
  //   axios
  //     .post("http://localhost:8082/register", formData)
  //     .then((response) => {
  //       alert("File Upload success");
  //     })
  //     .catch((err) => alert("File Upload Error"));
  // };


  

  const register = () => {
    if(passwordReg !== confPassewordReg){
      alert('password must be identic');
    }
    else if(!validate.isEmail(emailReg)) {
      alert('warning email invalid');
    }
    else
      axios.post("http://localhost:8082/register", {
          name: nameReg,
          first_name: firstNameReg,
          email: emailReg,
          phone: phoneReg,
          adress: adressReg,
          postal_code: postalCodeReg,
          city: cityReg,
          birth_date: birthDateReg,
          password: passwordReg,
          confPasseword: confPassewordReg,
          gender: genderReg,
        }).then((response) => {
          console.log(response);
        });
  };

  return (
    <div id="registration">
      <div id="form_registration">
        <label>
          <b>Name</b>
        </label>
        <input
          type="text" onChange={(e) => {setNameReg(e.target.value); }}
          placeholder="Enter your Name" name="name" required
        />
        <label>
          <b>FirstName</b>
        </label>
        <input
          type="text" onChange={(e) => {setfirstNameReg(e.target.value);}}
          placeholder="Enter your FirstName" name="first_name" required
        />
        <label>
          <b>Email</b>
        </label>
        <input
          type="email" onChange={(e) => {setemailReg(e.target.value);}}
          placeholder="Enter your email" name="email" required
        />
        <label>
          <b>Phone</b>
        </label>
        <input
          type="tel" onChange={(e) => {setphoneReg(e.target.value);}}
          placeholder="Enter your phone number" name="phone"
        />
        <label>
          <b>Adress</b>
        </label>
        <input
          type="text" onChange={(e) => {setadressReg(e.target.value);}}
          placeholder="Enter your adress" name="adress" required
        />
        <label>
          <b>Postal code</b>
        </label>
        <input
          type="numeric" onChange={(e) => {setpostalCodeReg(e.target.value);}}
          inputmode="numeric"
          placeholder="Enter your postal code" name="postal_code" required
        />
        <label>
          <b>City</b>
        </label>
        <input
          type="text" onChange={(e) => {setcityReg(e.target.value); }}
          placeholder="Enter your city" name="city" required
        />
        <label>
          <b>Birth date</b>
        </label>
        <input
          type="date" onChange={(e) => {setbirthDateReg(e.target.value); }}
          placeholder="Enter your birth date" name="birth_date"
        />
        <label for="gender">Gender : </label>
            <select name="gender" id="gender" onChange={(e) => {setgenderReg(e.target.value); }}>
              <option value="Girl">Girl</option>
              <option value="Boy">Boy</option>
              <option value="Non_binary">Non binary</option>
            </select>

        {/* <label>
          <b>Picture</b>
        </label>
        <input type="file" name="picture" accept=".jpg,.png,.jpeg" /> */}
        {/* <label>
          <b>CV</b>
        </label>
        <FileUpload
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        /> */}
        <label>
          <b>Password</b>
        </label>
        <input
          type="password" onChange={(e) => {setpasswordReg(e.target.value);}}
          name="password" required
        />
        <label>
          {" "}
          <b>Confirm your password</b>
        </label>
        <input type="password" onChange={(e) => {setconfPassewordReg(e.target.value); }} 
        name="confirm_password" required
        />
        <button className="button_form" onClick={e =>register()} id="submit_register" value="register"
        >Register</button>
      </div>
    </div>
  );
};

export default FormRegistrationUser;
