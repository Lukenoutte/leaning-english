import React, { useRef, useState } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/forgot_pass.css";
import { sendTokenToEmail } from "../services";
import history from "../history";

export default function ForgotPassword() {
  const inputEmail = useRef("");
  const [emailInputError, setEmailInputError] = useState(false);

  function validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }


  async function handleButtonSend(event){
    event.preventDefault();
    let email = inputEmail.current.value;


    if(!validateEmail(email)){
      setEmailInputError(true);
      return;
    }

    let response = await sendTokenToEmail({email});
    console.log(response);

    if(response.status && response.status === 200){
      history.push("/code_forgot_pass");
    }
  }

  const inputClass = () => {
     if (emailInputError) return "g-input-error";

    return "";
  };

  return (
    <HeaderAndFotter>
      <div className="forgot-pass global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <h2 className="title-recover">Recover Password</h2>
            <p className="description-forgot-pass">Don't worry, we will send a recover code.</p>
            <input
              type="text"
              placeholder="E-mail"
              className={inputClass()}
              ref={inputEmail}
            />
            <button onClick={(e) => handleButtonSend(e)} className="button-send">Send me</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
