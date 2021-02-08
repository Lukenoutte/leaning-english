import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "./styles/warning.css";

import { Link } from "react-router-dom";

export default function WarningPage(props) {
  return (
    <HeaderAndFotter>
      <div className="warning global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <h1>{props.title}</h1>

            <p> {props.text} </p>

            <Link to={props.linkDestination}>{props.buttonText}</Link>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
