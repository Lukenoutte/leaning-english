import React, { useRef, useState } from "react";
import { sendTokenToEmail } from "../services";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";

export default function ForgotPassword() {
  const inputRef = useRef("");
  const inputPassExtra = useRef("");
  const [emailInputError, setEmailInputError] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  function validatePass(arg) {
    if ((arg.pass === "") || (arg.confirmPass === "")) return false;

    if ((arg.pass.length < 6) && (arg.confirmPass.length < 6)) return false;

    if (arg.pass === arg.confirmPass) return true;

    return false;
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    let pass = inputRef.current.value;
    let confirmPass = inputPassExtra.current.value;
    console.log(pass, confirmPass);
    if (!validatePass({ pass, confirmPass })) {
      setEmailInputError(true);
      return;
    }

    history.push("/change_pass");
  }

  return (
    <PagesForgotPass
      isLoading={isLoading}
      handleButtonSend={handleButtonSend}
      title="Choose a new password!"
      subtitle="Try something new."
      placeholder="Password"
      emailInputError={emailInputError}
      buttonText={"Send"}
      inputRef={inputRef}
      extraInput={true}
      extraPlaceholder="Confirm Password"
      inputType="password"
      extraInputRef={inputPassExtra}
    ></PagesForgotPass>
  );
}
