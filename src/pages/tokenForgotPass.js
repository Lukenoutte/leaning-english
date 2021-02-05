import React, { useRef, useState, useContext } from "react";
import history from "../history";
import PagesForgotPass from "../components/pagesForgotPass";
import { MainContext } from "../context/MainContext";
import { verifyResetToken } from "../services";

export default function TokenForgotPass() {
  const inputRef = useRef("");
  const [codeInputError, setCodeInputError] = useState(false);
  const { setRecoverPassInfo, recoverPassInfo } = useContext(MainContext);
  const [isLoading, setIsloading] = useState(false);

  function validateCode(token) {
    if (token.length === 40) {
      return true;
    }
    return false;
  }

  async function handleButtonSend(event) {
    event.preventDefault();
    let token = inputRef.current.value;

    if (!validateCode(token)) {
      setCodeInputError(true);
      return;
    }
    setIsloading(true);
    const response = await verifyResetToken({email: recoverPassInfo.email, token: token});

    if (response.status && response.status === 200) {
    var obj = {};
    obj["token"] = token;

    setRecoverPassInfo((oldArray) => ({ ...oldArray, ...obj }));
    history.push("/change_pass");
    } else{
      setCodeInputError(true);
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
      emailInputError={codeInputError}
      buttonText={"Send"}
      inputRef={inputRef}
      inputType="text"
    ></PagesForgotPass>
  );
}
