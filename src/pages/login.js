import React, { useRef, useState, useContext } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { login } from "../services";
import { Context } from "../context/AuthContext";
import history from '../history';

function Login() {
  const inputEmail = useRef("");
  const inputPass = useRef("");
  const [emptyInput, setEmptyInput] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [loginFailMessage, setLoginFailMessage] = useState("");
  const { authenticated, setAuthenticated } = useContext(Context);

  const HandleLogin = async (event) => {
    event.preventDefault();
    let email = inputEmail.current.value;
    let pass = inputPass.current.value;

    if (email !== "" && pass !== "") {
      if(emptyInput) setEmptyInput(false);

      let response = await login({ email, pass });

      if(response && response.status === 200){
        setAuthenticated(true);
        let token = response.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        history.push('/');
      }else if(response.status === 400){
        
        setLoginFailMessage(response.data.error);
   
        setLoginFail(true);
      }
        
    } else {
      setEmptyInput(true);
    }
  };

  const InputClass = (ref) => {
    if (emptyInput && ref.current.value === "") {
      return "input-error";
    }

    if (loginFail) {
      return "input-error";
    }

    return "";
  };

  const ErrorMessage = () => {
    if (emptyInput) {
      return (
        <div className="empty-input-error">
          <p>Ops, Empty field!</p>
        </div>
      );
    }

    if(loginFail){
      return (
        <div className="empty-input-error">
          <p>{loginFailMessage}</p>
        </div>
      );
    }

    return false;
  };

  return (
    <HeaderAndFotter>
      {console.log(authenticated)}
      <div className="login global-wrapper">
        <div className="center-container">
          <div className="inputs-wrapper shadow-light styled-buttons">
            <ErrorMessage />

            <h1>Login</h1>

            <input
              type="text"
              placeholder="E-mail"
              ref={inputEmail}
              className={InputClass(inputEmail)}
            />

            <input
              id="pass-input"
              type="password"
              placeholder="Password"
              ref={inputPass}
              className={InputClass(inputPass)}
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
