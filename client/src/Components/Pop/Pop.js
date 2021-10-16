import React from "react";
import FormApply from "../FormApply/FormApply";

import "./Pop.css";

const Pop = (props) => {
  return (
    <div id="pop">
      <FormApply idAdv={props.id} />
    </div>
  );
};

export default Pop;
