import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/sign_up.css";


function CreateAccount() {
  return (
    <HeaderAndFotter>
      <div className="sign-up global-wrapper">
        <div className="center-container">
          
          <div className="inputs-wrapper shadow-light styled-buttons"> 
          <h1>Sign Up</h1>
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="E-mail"/>
          <input type="password" placeholder="Password"/>
          <input  type="password" placeholder="Confirm Password"/>
          <button>Start</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default CreateAccount;
