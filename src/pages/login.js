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
  const { authenticated, setAuthenticated } = useContext(Context);

  const HandleLogin = async (event) => {
    event.preventDefault();
    let email = inputEmail.current.value;
    let pass = inputPass.current.value;

    if (email !== "" && pass !== "") {
      let response = await login({ email, pass });

      if(response.status === 200){
        setAuthenticated(true);
        let token = response.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        history.push('/');
      }
        
    } else {
      setEmptyInput(true);
    }
  };

  const emptyInputClass = (ref) => {
    if (emptyInput && ref.current.value === "") {
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
              className={emptyInputClass(inputEmail)}
            />

            <input
              id="pass-input"
              type="password"
              placeholder="Password"
              ref={inputPass}
              className={emptyInputClass(inputPass)}
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
