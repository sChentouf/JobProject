import React from "react";
import "./ButtonLearnMore.css";

const ButtonLearnMore = (props) => {
    return (
        <button onClick={() => props.onClick()} href="#">
            Learn More
        </button>
        
    )
}

export default ButtonLearnMore;