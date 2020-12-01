import React from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/login.css";
import {Link} from 'react-router-dom';

function Login() {
  return (
    <HeaderAndFotter>
      <div className="login">
        <div className="center-container">
          
          <div className="inputs-wrapper shadow-light styled-buttons"> 
          <h1>Login</h1>
          <input type="text" placeholder="E-mail"/>
          <input id="pass-input" type="password" placeholder="Password"/>
          <Link to="/">Forgot password?</Link>
          <button>Login</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default Login;
