import React from "react";
import "./styles/pop_up.css";

export default function PopUp(props) {
    return(<div className="pop-up-wrapper">
        {props.message}
    </div>);
}