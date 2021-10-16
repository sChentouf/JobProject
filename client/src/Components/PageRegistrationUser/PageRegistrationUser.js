import React from "react";
//import FormLogin from "../FormLogin/FormLogin";
import FormRegistrationUser from "../FormRegistrationUser/FormRegistrationUser";
import "./PageRegistrationUser.css";

const PageRegistrationUser = () => {
    return (
        <div id="cont_login">
            <div>
                <h3>Join us</h3>
                <h4>Please enter the information</h4>
                <FormRegistrationUser />
           </div>
        </div>
    )
}

export default PageRegistrationUser;