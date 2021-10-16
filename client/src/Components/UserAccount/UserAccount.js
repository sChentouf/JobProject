import React, { useEffect, useState } from "react";
import validate from 'validator';
import "./UserAccount.css";
import jwt from "jsonwebtoken";
import logo from "../../images/logo_small_blue.png";
import axios from "axios";

const UserAccount = (props) => {

  const Delog = () => {
    localStorage.removeItem("myJWT");
    window.location.href = `/`;
  };

  const Delete = () => {
    const localtoken = localStorage.getItem("myJWT");
    const decoded = jwt.verify(localtoken, "secret");
    axios
      .delete("http://localhost:8082/candidate/" + decoded.id)
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
    first_name: "",
    email: "",
    phone: "",
    adress: "",
    postal_code: "",
    city: "",
    birth_date: "",
    password: "",
  });

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


  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const UpdateInfosUser = () => {
    if(userData.password !== userData.confirm_password){
      alert('password must be identic');
    }
    else if(!validate.isEmail(userData.email)) {
      alert('warning email invalid');
    }
     else
    console.log("zeze");
    console.log(userData);
    const localtoken = localStorage.getItem("myJWT");
    const decoded = jwt.verify(localtoken, "secret");
      axios.post("http://localhost:8082/candidate/" + decoded.id, {
        // if(props.match.params == undefined)
     
          name: userData.name,
          first_name: userData.first_name,
          email: userData.email,
          phone: userData.phone,
          adress:  userData.adress,
          postal_code: userData.postal_code,
          city: userData.city,
          birth_date:  userData.birth_date.split('T')[0],
          password:  userData.password,
          // confirm_password:  userData.confirm_password,
        }).then((response) => {
          console.log(response);
        });
  };


  return (
    <div>
      <div id="content_user_account">
        {userData && (
          <div id="info_user">
            <h3>Informations User</h3>
            <div>
              {/* if exist else defautl*/}
              {/* <img className="saut" src={logo} alt="logo" />
              <button>Change pitcure</button><br /> */}
        {/* NAME */}
              <label>
                <b>Name : {userData.name}</b>
              </label>
              <input type="text" name="name" 
              value={userData.name} onChange={(e) => {handleChange(e); }}/>
        {/* FISRT NAME */}
              <label>
                <b>First Name : {userData.first_name}</b>
              </label>
              <input type="text" name="first_name"
                value={userData.first_name}  onChange={(e) => {handleChange(e); }} />
        {/* EMAIL */}
              <label>
                <b>Email : {userData.email}</b>
              </label>
              <input type="email" name="email"
              value={userData.email}  onChange={(e) => {handleChange(e); }}/>
        {/* PHONE if exist*/}
              <label>
                <b>Phone : {userData.phone}</b>
              </label>
              <input type="tel" name="phone"
                 value={userData.phone}  onChange={(e) => {handleChange(e); }}/>
          {/* ADRESS*/}
              <label>
                <b>Adress : {userData.adress}</b>
              </label>
              <input type="text" name="adress"
                value={userData.adress}  onChange={(e) => {handleChange(e); }}/>
          {/* POSTAL CODE*/}
              <label>
                <b>Postal Code : {userData.postal_code}</b>
              </label>
              <input type="numeric" name="postal_code"
               value={userData.postal_code}  onChange={(e) => {handleChange(e); }}/> 
          {/* CITY*/}
              <label>
                <b>City : {userData.city}</b>
              </label>
              <input type="text" name="city"
              value={userData.city}  onChange={(e) => {handleChange(e); }}/> 
          {/* BIRTH DATE if exist*/}
              <label className="saut">
                <b>birth date : {userData.birth_date.split('T')[0]}</b>
              </label><br />     
          {/* GENDER*/}
              <label className="saut">
                <b>Gender : {userData.gender}</b>
              </label><br />
              {/* <p>CV : </p> */}
          {/* PASSEWORD*/}
              <label>
                  <b>Change password :</b>
                </label>
                <input
                  type="password" name="password"
                  value={userData.password}  onChange={(e) => {handleChange(e); }}/> 
                <label>
                  {" "}
                  <b>Confirm your new password</b>
                </label>
                <input type="password" name="confirm_password"
                value={userData.confirm_password}  onChange={(e) => {handleChange(e); }}/> 

          {/* BOUTON*/}
        <button className="button_form" onClick={e =>UpdateInfosUser()} id="submit_change" value="change"
        >Change info</button>
            </div>
          </div>
        )}
        
        <div id="candidacy_user">
          <h3>candidacy user</h3>
          <ul>
            <li>"lien de l'annonce auquel il a postuler"</li>
            <li>"lien de l'annonce auquel il a postuler"</li>
          </ul>
        </div>
      </div>
      <button onClick={(e) => Delete()}>Delete account</button>
      <button onClick={e => Delog()}>Logout</button>
    </div>
  );
};
export default UserAccount;
