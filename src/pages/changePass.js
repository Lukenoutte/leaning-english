import React, { useRef, useState, useContext } from "react";
import { resetPass } from "../services";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";
import { MainContext } from "../context/MainContext";

export default function ForgotPassword() {
  const inputRef = useRef("");
  const inputPassExtra = useRef("");
  const [inputError, setInputError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { recoverPassInfo } = useContext(MainContext);

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
      setInputError(true);
      return;
    }

    setIsloading(true);

    let response = await resetPass({email: recoverPassInfo.email, password: pass, token: recoverPassInfo.token});

    if (response.status && response.status === 200) {
      console.log(response);
      setIsloading(false);
    } else {
      setIsloading(false);
    }
  }

  return (
    <PagesForgotPass
      isLoading={isLoading}
      handleButtonSend={handleButtonSend}
      title="Choose a new password!"
      subtitle="Try something new."
      placeholder="Password"
      emailInputError={inputError}
      buttonText={"Send"}
      inputRef={inputRef}
      extraInput={true}
      extraPlaceholder="Confirm Password"
      inputType="password"
      extraInputRef={inputPassExtra}
    ></PagesForgotPass>
  );
}
