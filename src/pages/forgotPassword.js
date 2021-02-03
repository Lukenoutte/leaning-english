import React, { useRef, useState } from "react";
import { sendTokenToEmail } from "../services";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";

export default function ForgotPassword() {
  const inputRef = useRef("");
  const [emailInputError, setEmailInputError] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    console.log("test");
    let email = inputRef.current.value;

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
      title="Recover Password"
      subtitle="Don't worry, we will send a recover code."
      placeholder="E-mail"
      emailInputError={emailInputError}
      buttonText={"Send me"}
      inputRef={inputRef}
      inputType="text"
    ></PagesForgotPass>
  );
}
