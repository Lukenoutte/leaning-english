import React, { useRef, useState } from "react";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";

export default function ForgotPassword() {
  const inputRef = useRef("");
  const [emailInputError, setEmailInputError] = useState(false);

  function validateCode(code) {
    if (code.length === 40) {
      return true;
    }
    return false;
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    let email = inputRef.current.value;

    if (!validateCode(email)) {
      setEmailInputError(true);
      return;
    }

    history.push("/change_pass");

    
  }

  return (
    <PagesForgotPass
      
      handleButtonSend={handleButtonSend}
      title="We sent a code!"
      subtitle="Check your e-mail box."
      placeholder="Code"
      emailInputError={emailInputError}
      buttonText={"Send"}
      inputRef={inputRef}
      inputType="text"
    ></PagesForgotPass>
  );
}
