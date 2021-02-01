import React, { useRef, useState } from "react";
import HeaderAndFotter from "../components/headerAndFooter";
import "../styles/forgot_pass.css";
import { sendTokenToEmail } from "../services";

export default function CodeForgotPass() {
  const inputCode = useRef("");
  const [codeInputError, setCodeInputError] = useState(false);

  function validateCode(code) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(code);
  }


  async function handleButtonSend(event){
    event.preventDefault();
    let code = inputCode.current.value;


    if(!validateCode(code)){
      setCodeInputError(true);
      return;
    }

    //let response = await sendTokenToEmail({email: code});
    //console.log(response);
  }

  const inputClass = () => {
     if (codeInputError) return "g-input-error";

    return "";
  };

  return (
    <HeaderAndFotter>
      <div className="forgot-pass global-wrapper">
        <div className="g-center-container-two">
          <div className="g-inputs-wrapper g-shadow-light g-styled-buttons">
            <h2 className="title-recover">We sent a code!</h2>
            <p className="description-forgot-pass">Check your e-mail box.</p>
            <input
              type="text"
              placeholder="Code"
              className={inputClass()}
              ref={inputCode}
            />
            <button onClick={(e) => handleButtonSend(e)} className="button-send">Send</button>
          </div>
        </div>
      </div>
    </HeaderAndFotter>
  );
}
