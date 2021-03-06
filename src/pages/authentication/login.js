import React, { useRef, useState, useContext } from "react";

import "./styles/login.css";
import { Link } from "react-router-dom";
import { login } from "../../services/myApi/auth";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/utilities/loading";
import history from "../../history";

import NeedAuth from "../../components/utilities/needAuth";

function Login() {
  const inputEmail = useRef("");
  const inputPass = useRef("");
  const [emptyInput, setEmptyInput] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [loginFailMessage, setLoginFailMessage] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);

  const loginFunc = async (event) => {
    event.preventDefault();
    let email = (inputEmail.current.value).replace(/\s/g, "");
    let pass = inputPass.current.value;


    if (email === "" || pass === "") {
      setEmptyInput(true);
      setLoginFailMessage("Ops, Empty field!");
      return;
    }
    setIsloading(true);
    let response = await login({ email, pass });

    if (response && response.status === 200) {
      handleLogin({ response });
      history.push("/");
    } else {
      if (response && response.data.error) {
        setLoginFailMessage(response.data.error);
      } else {
        setLoginFailMessage("Somenthing wrong :(");
      }

      setLoginFail(true);
      setIsloading(false);
    }

  };

  const InputClass = (ref) => {
    if (loginFail || (emptyInput && ref.current.value === "")) {
      return "g-input-error";
    }

    return "";
  };

  const ErrorMessage = () => {
    if (loginFail || emptyInput) {
      return (
        <div className="g-empty-input-error">
          <p>{loginFailMessage}</p>
        </div>
      );
    }

    return false;
  };

  return (
    <NeedAuth needAuth={false}>


      <div className="login global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <div className="g-wrapper-response">
              {!isLoading && (<ErrorMessage />)}
              {isLoading && (<Loading />)}
            </div>
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
            <Link to="/forgot_pass">Forgot password?</Link>
            <button onClick={loginFunc}>Login</button>


          </div>
        </div>
      </div>


    </NeedAuth>
  );
}

export default Login;
