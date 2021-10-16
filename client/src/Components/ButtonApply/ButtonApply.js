import React from "react";
import "./ButtonApply.css";

const ButtonApply = (props) => {
    return (
        <button onClick={() => props.onClick()} href="#">
            Apply
        </button>

    )
}

export default ButtonApply;