import React, { useRef, useState } from "react";
import { sendTokenToEmail } from "../services";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";

export default function ForgotPassword() {
  const inputEmail = useRef("");
  const [emailInputError, setEmailInputError] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    console.log("test");
    let email = inputEmail.current.value;

    if (!validateEmail(email)) {
      setEmailInputError(true);
      return;
    }

    setIsloading(true);

    let response = await sendTokenToEmail({ email });
    console.log(response);

    if (response.status && response.status === 200) {
      history.push("/code_forgot_pass");
    } else {
      setIsloading(false);
    }
  }

  return (
    <PagesForgotPass
      isLoading={isLoading}
      handleButtonSend={handleButtonSend}
      title="We sent a code!"
      subtitle="Check your e-mail box."
      placeholder="Code"
      emailInputError={emailInputError}
      buttonText={"Send"}
      inputEmail={inputEmail}
    ></PagesForgotPass>
  );
}
