import React, { useRef, useState } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/sign_up.css";

import services from "../services";

function SignUp() {
  const inputName = useRef("");
  const inputEmail = useRef("");
  const inputPass = useRef("");
  const inputConfirmPass = useRef("");
  const [emptyInput, setEmptyInput] = useState(false);

  const HandleSignUp = (event) => {
    event.preventDefault();
    let name = inputName.current.value;
    let email = inputEmail.current.value;
    let pass = inputPass.current.value;
    let confirmPass = inputConfirmPass.current.value;

    if (name === "" || email === "" || pass === "" || confirmPass === "") {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }

    if (pass !== confirmPass) {
      return;
    }
  };

  return (
    <HeaderAndFotter>
      <div className="sign-up global-wrapper">
        <div className="center-container">
          <div className="inputs-wrapper shadow-light styled-buttons">
            {emptyInput ? (
              <div className="empty-input-error">
                <p>Ops, Campo vazio!</p>
              </div>
            ) : (
              false
            )}
            <h1>Sign Up</h1>
            <input
              type="text"
              placeholder="Name"
              ref={inputName}
              className={
                emptyInput && inputName.current.value === ""
                  ? "input-error"
                  : ""
              }
            />
            <input
              type="text"
              placeholder="E-mail"
              ref={inputEmail}
              className={
                emptyInput && inputEmail.current.value === ""
                  ? "input-error"
                  : ""
              }
            />
            <input
              type="password"
              placeholder="Password"
              ref={inputPass}
              className={
                emptyInput && inputPass.current.value === ""
                  ? "input-error"
                  : ""
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={inputConfirmPass}
              className={
                emptyInput && inputConfirmPass.current.value === ""
                  ? "input-error"
                  : ""
              }
            />
            <button onClick={(e) => HandleSignUp(e)}>Start</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}

export default SignUp;
