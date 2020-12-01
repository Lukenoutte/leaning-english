import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/create_account.css";


function CreateAccount() {
  return (
    <HeaderAndFotter>
      <div className="create-account">
        <div className="center-container">
          
          <div className="inputs-wrapper shadow-light styled-buttons"> 
          <h1>Create Account</h1>
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="E-mail"/>
          <input type="password" placeholder="Password"/>
          <input  type="password" placeholder="Confirm Password"/>
          <button>Create Account</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default CreateAccount;
