import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/forgot_pass.css";

export default function ForgotPassword() {
  return (
    <HeaderAndFotter>
      <div className="forgot-pass global-wrapper">
        <div className="center-container-two">
          <div className="inputs-wrapper shadow-light styled-buttons">
            <h2 className="title-recover">Recover Password</h2>
            <p>Don't worry, we will send a recover code.</p>
            <input
              type="text"
              placeholder="E-mail"
              className="email-recover-input"
            />
            <button className="button-send">Send me</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
