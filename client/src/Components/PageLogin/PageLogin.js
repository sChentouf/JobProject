import React from "react";
import UserAccount from "../UserAccount/UserAccount";
import FormLogin from "../FormLogin/FormLogin";
//import "./PageRegistrationUser.css";
const PageLogin = () => {
  return (
    <div>
      <div>
        {localStorage.getItem("myJWT") ? <UserAccount /> : <FormLogin />}
        <h3>Already registered ?</h3>
      </div>
    </div>
  );
};
export default PageLogin;