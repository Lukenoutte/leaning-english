import React, { useRef, useState } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/login.css";
import { Link } from "react-router-dom";
import services from "../services";

function Login() {
  const inputEmail = useRef("");
  const inputPass = useRef("");
  const [emptyInput, setEmptyInput] = useState(false);

  const HandleLogin = (event) => {
    event.preventDefault();
    let email = inputEmail.current.value;
    let pass = inputPass.current.value;

    if (email !== "" && pass !== "") {
      services.login({ email, pass });
      setEmptyInput(false);
    } else {
      
      setEmptyInput(true);
    }
  };

  const inputClass = (ref) => {
    if(emptyInput && ref.current.value === ""){
     return "input-error";
    }

    return "";
  }

  return (
    <HeaderAndFotter>
      <div className="login global-wrapper">
        <div className="center-container">
          <div className="inputs-wrapper shadow-light styled-buttons">

          {emptyInput ? (
              <div className="empty-input-error">
                      <p>Ops, Campo vazio!</p>
              </div>
            ) : (
              false
            )}

            <h1>Login</h1>
      
            <input
              type="text"
              placeholder="E-mail"
              ref={inputEmail}
              className={inputClass(inputEmail)}
            />

            <input
              id="pass-input"
              type="password"
              placeholder="Password"
              ref={inputPass}
              className={inputClass(inputPass)}
            />
            <Link to="/">Forgot password?</Link>
            <button onClick={(e) => HandleLogin(e)}>Login</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default Login;
