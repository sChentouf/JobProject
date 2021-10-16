import React from "react";
import FormApply from "../FormApply/FormApply";
import FormApplyUser from "../FormApplyUser/FormApplyUser"

import "./Pop.css";

const Pop = (props) => {
  return (
    <div id="pop">
       {localStorage.getItem("myJWT") ? <FormApplyUser idAdv={props.id} /> : <FormApply idAdv={props.id} />}
    </div>
  );
};

export default Pop;
