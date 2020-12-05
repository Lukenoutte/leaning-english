import React,{ useRef } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/login.css";
import {Link} from 'react-router-dom';
import services from "../services";

function Login() {
  const inputEmail = useRef('');
  const inputPass = useRef('');


  const HandleLogin = (event) => {
    event.preventDefault();
    let email = inputEmail.current.value;
    let pass = inputPass.current.value;

    if (email !== "") {
     
      services.login({email: email, pass: pass});
    }
  
  };

  return (
    <HeaderAndFotter>
      <div className="login global-wrapper">
        <div className="center-container">
          
          <div className="inputs-wrapper shadow-light styled-buttons"> 
          <h1>Login</h1>
          <input type="text" placeholder="E-mail" ref={inputEmail}/>
          <input id="pass-input" type="password" placeholder="Password" ref={inputPass}/>
          <Link to="/">Forgot password?</Link>
          <button onClick={(e) => HandleLogin(e)} >Login</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default Login;
