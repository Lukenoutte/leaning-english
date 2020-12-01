import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/login.css";

function Login() {
  return (
    <HeaderAndFotter>
      <div className="login">
        <div className="center-container">
          
          <div className="inputs-wrapper shadow-light"> 
          <h1>Login</h1>
          <input type="text" placeholder="E-mail"/>
          <input id="pass-input" type="password" placeholder="Password"/>
          <button>Login</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default Login;
