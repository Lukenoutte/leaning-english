import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "./styles/warning.css";

import { Link } from "react-router-dom";

export default function WarningPage(props) {
  const {button, labels } = props;

  return (
    <HeaderAndFotter>
      <div className="warning global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <h1>{labels.title}</h1>

            <p> {labels.text} </p>

            <Link to={button.link}>{button.text}</Link>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
