import React, { useRef, useState } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/sign_up.css";

import { signUp } from "../services";

function SignUp() {
  const inputName = useRef("");
  const inputEmail = useRef("");
  const inputPass = useRef("");
  const inputConfirmPass = useRef("");
  const [emptyInput, setEmptyInput] = useState(false);
  const [differentPass, setDifferentPass] = useState(false);
  const [loginFailMessage, setLoginFailMessage] = useState("");

  const HandleSignUp = (event) => {
    event.preventDefault();
    let name = inputName.current.value;
    let email = inputEmail.current.value;
    let pass = inputPass.current.value;
    let confirmPass = inputConfirmPass.current.value;

    if (name === "" || email === "" || pass === "" || confirmPass === "") {
      setEmptyInput(true);
      setLoginFailMessage("Ops, Empty field!");
      return;
    }

    if (pass !== confirmPass) {
      setDifferentPass(true);
      setLoginFailMessage("Ops, passwords don't match!");
      return;
    }

    signUp({ name, email, pass, confirmPass });
  };

  const inputClass = (ref, isPassInput) => {
    if (emptyInput && ref.current.value === "") {
      return "input-error";
    }

    if (differentPass && isPassInput) return "input-error";

    return "";
  };

  const ErrorMessage = () => {
    if (emptyInput) {
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
      <div className="sign-up global-wrapper">
        <div className="center-container">
          <div className="inputs-wrapper shadow-light styled-buttons">
            <ErrorMessage/>
            <h1>Sign Up</h1>
            <input
              type="text"
              placeholder="Name"
              ref={inputName}
              className={inputClass(inputName)}
            />
            <input
              type="text"
              placeholder="E-mail"
              ref={inputEmail}
              className={inputClass(inputEmail)}
            />
            <input
              type="password"
              placeholder="Password"
              ref={inputPass}
              className={inputClass(inputPass, true)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={inputConfirmPass}
              className={inputClass(inputConfirmPass, true)}
            />
            <button onClick={(e) => HandleSignUp(e)}>Start</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default SignUp;
